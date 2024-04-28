import React, { useEffect, useState } from "react";

import { IoClose } from "react-icons/io5";
import { FaBath, FaBed, FaChartArea } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { GiHomeGarage } from "react-icons/gi";
import { FcCheckmark, FcCancel } from "react-icons/fc";
import { MdOutlinePool, MdForest } from "react-icons/md";

import {
  getStorage,
  ref as Sref,
  listAll,
  getDownloadURL,
} from "firebase/storage";

import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import "./details.css";

const Details = (props) => {
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    // Function to fetch the images for a listing from Firebase Storage

    const fetchImages = async () => {
      try {
        const storage = getStorage();
        let listingRef = Sref(storage, `${props.type}/${props.id}`);

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
                        <a
                          href={`mailto:${props.email}?subject=demande%20de%20devis%20-%20Le%20Point%20Immobilier%20Tunisie&body=Bonjour%2C%0D%0A%0D%0ANous%20voulons%20vous%20remercier%20pour%20votre%20confiance%20et%20pour%20nous%20avoir%20contact%C3%A9s.%20Nous%20sommes%20heureux%20de%20vous%20fournir%20le%20devis%20pour%20la%20propri%C3%A9t%C3%A9%20que%20vous%20avez%20demand%C3%A9e.%20Le%20montant%20s%27%C3%A9l%C3%A8ve%20%C3%A0%20XXXXX%20TND.%0D%0A%0D%0AN%27h%C3%A9sitez%20pas%20%C3%A0%20nous%20contacter%20si%20vous%20avez%20des%20questions%20ou%20si%20vous%20avez%20besoin%20de%20plus%20amples%20informations.%20Nous%20sommes%20%C3%A0%20votre%20disposition.%0D%0A%0D%0ACordialement%2C%0D%0ALe%20Point%20Immobilier%20Tunisie.`}
                        >
                          {props.email}
                        </a>
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
                  className="supprimer-btn"
                  onClick={() => props.deleteQuoteRequest(props.requestID)}
                >
                  Supprimer
                </button>
                <button
                  className="vu-btn"
                  onClick={() => props.markQuoteAsSeen(props.requestID)}
                >
                  Marquer comme vu
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
