import React, { useEffect, useState } from "react";

import { IoClose } from "react-icons/io5";
import { FaBath, FaBed, FaChartArea } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { GiHomeGarage } from "react-icons/gi";
import { FcCheckmark, FcCancel } from "react-icons/fc";
import { MdOutlinePool, MdForest } from "react-icons/md";

import { getDatabase, ref, get, set } from "firebase/database";

import {
  getStorage,
  ref as Sref,
  listAll,
  getDownloadURL,
} from "firebase/storage";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import "./decisionDetails.css";

const Details = (props) => {
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    // Function to fetch the images for a listing from Firebase Storage

    const fetchImages = async () => {
      try {
        const storage = getStorage();
        let listingRef = Sref(storage, `${props.type}/${props.listingId}`);

        // List all items in the folder
        let listingImages = await listAll(listingRef);

        // Create an array of objects with the required format
        const imagesArray = await Promise.all(
          listingImages.items.map(async (item) => ({
            original: await getDownloadURL(item),
          }))
        );

        // Set the state with the formatted images
        setImageList(imagesArray);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    // Call the function to fetch the images
    fetchImages();
  }, [props.id]);

  const handleApproveListing = (listingId) => {
    const database = getDatabase();
    const listingRef = ref(database, `listings/${props.type}/${listingId}`);

    // Fetch the existing data
    get(listingRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const existingData = snapshot.val();
          // Update the state attribute
          existingData.state = "approved";
          // Update the listing with the modified data
          set(listingRef, existingData).catch((error) => {
            console.error("Error updating listing:", error);
          });
        } else {
          console.error("Listing does not exist");
        }
      })
      .catch((error) => {
        console.error("Error fetching listing:", error);
      });
  };

  const handleRefuseListing = (listingId) => {
    const database = getDatabase();
    const listingRef = ref(database, `listings/${props.type}/${listingId}`);

    // Fetch the existing data
    get(listingRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const existingData = snapshot.val();
          // Update the state attribute
          existingData.state = "denied";
          // Update the listing with the modified data
          set(listingRef, existingData).catch((error) => {
            console.error("Error updating listing:", error);
          });
        } else {
          console.error("Listing does not exist");
        }
      })
      .catch((error) => {
        console.error("Error fetching listing:", error);
      });
  };

  const handleDeleteListing = (listingId) => {
    const database = getDatabase();
    const listingRef = ref(database, `listings/${props.type}/${listingId}`);
    set(listingRef, null).catch((error) => {
      console.error("Error deleting listing:", error);
    });
    props.closeDetails();
    alert("supprimé!");
  };

  return (
    <div>
      <div className={`details-blog-post-card`}>
        <div className="details-container">
          <IoClose onClick={props.closeDetails} className="details-icon" />

          <ImageGallery items={imageList} showIndex={true} />

          <div className="details-content">
            <div className="details-left">
              <span className="details-text">{props.title}</span>
              <div className="details-location">
                <FaMapLocationDot />

                <span className="details-text01">{props.location}</span>
              </div>
              <div className="details-description">
                <span className="details-text02">Description:</span>
                <span className="details-text03">{props.body}</span>
              </div>
              <div className="details-table-container">
                <table className="details-table">
                  <thead>
                    <tr>
                      <th>Attribut</th>
                      <th>Valeur</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Zone Construite</td>
                      <td>{props.areaC}</td>
                    </tr>
                    <tr>
                      <td>Zone Non Construite</td>
                      <td>{props.areaNC}</td>
                    </tr>
                    <tr>
                      <td>Ville</td>
                      <td>{props.city}</td>
                    </tr>
                    {props.commercialType && (
                      <tr>
                        <td>Type Commercial</td>
                        <td>{props.commercialType}</td>
                      </tr>
                    )}
                    <tr>
                      <td>Date et Heure</td>
                      <td>
                        {new Date(props.dateTime).toLocaleString("fr-FR")}
                      </td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>
                        <a href={`mailto:${props.email}`}>{props.email}</a>
                      </td>
                    </tr>
                    <tr>
                      <td>Numéro de Téléphone</td>
                      <td>
                        <a href={`tel:${props.phoneNumber}`}>
                          {props.phoneNumber}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>Titre de Propriété</td>
                      <td>{props.propertyTitle ? "Oui" : "Non"}</td>
                    </tr>

                    <tr>
                      <td>Viabilisé</td>
                      <td>{props.viabilise ? "Oui" : "Non"}</td>
                    </tr>
                    <tr>
                      <td>Année de construction</td>
                      <td>{props.yearBuilt}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="details-right">
              <div className="details-info">
                <div className="details-basics">
                  <div className="details-container2">
                    <FaBed className="details-icon2" />
                    <span className="details-text04">{props.beds}</span>
                  </div>
                  <div className="details-container3">
                    <FaBath className="details-icon2" />
                    <span className="details-text04">{props.baths}</span>
                  </div>
                  <div className="details-container4">
                    <FaChartArea className="details-icon2" />

                    <span className="details-text04">
                      {Number(props.areaC) + Number(props.areaNC)}
                      m²
                    </span>
                  </div>
                </div>
                <div className="details-extras">
                  <div className="details-container5">
                    <GiHomeGarage className="details-icon2" />

                    <div>{props.garage ? <FcCheckmark /> : <FcCancel />}</div>
                  </div>
                  <div className="details-container6">
                    <MdOutlinePool className="details-icon2" />

                    <div>{props.pool ? <FcCheckmark /> : <FcCancel />}</div>
                  </div>
                  <div className="details-container7">
                    <MdForest className="details-icon2" />
                    <div>{props.garden ? <FcCheckmark /> : <FcCancel />}</div>
                  </div>
                </div>
              </div>
              <div className="details-separator"></div>
              <div className="details-ownership">
                <span className="details-text08">{props.nature}</span>
              </div>
              <div className="details-separator"></div>
              <div className="details-price">
                <span className="details-text08">Prix</span>
                <span className="details-text11">{props.price} TND</span>
              </div>
              <div className="details-separator"></div>

              <div className="details-container8">
                <button
                  className="approve-btn"
                  onClick={() => handleApproveListing(props.listingId)}
                >
                  Approuver
                </button>
                <button
                  className="refuse-btn"
                  onClick={() => handleRefuseListing(props.listingId)}
                >
                  Refuser
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteListing(props.listingId)}
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
