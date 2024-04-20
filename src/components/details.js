import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";

import { getDatabase, ref, set, push } from "firebase/database";
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
        let listingRef = Sref(storage, `sale/${props.id}`);

        // List all items in the folder
        let listingImages = await listAll(listingRef);

        if (listingImages.items.length == 0) {
          listingRef = Sref(storage, `rent/${props.id}`);

          listingImages = await listAll(listingRef);
        }

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

                  <span className="details-text04">{props.areaC} m²</span>
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
              <button className="refuser-btn">Refuser</button>
              <button className="accepter-btn">Accepter</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Details.defaultProps = {
  id: "",
  areaC: "",
  areaNC: "",
  baths: "",
  ownership: "Privé",
  title: "",
  beds: "",
  garage: "",
  description: ":",
  quote: "",
  location: "",
  price: "",
  range: "",
  body: "",
  closeDetails: "",
  pool: "",
  garden: "",
  nature: "",
  interval: "",
  type: "",
};

Details.propTypes = {
  id: PropTypes.string,
  areaC: PropTypes.string,
  areaNC: PropTypes.string,
  baths: PropTypes.string,
  ownership: PropTypes.string,
  title: PropTypes.string,
  beds: PropTypes.string,
  garage: PropTypes.bool,
  description: PropTypes.string,
  quote: PropTypes.string,

  location: PropTypes.string,
  price: PropTypes.string,
  range: PropTypes.string,
  body: PropTypes.string,
  closeDetails: PropTypes.func,
  pool: PropTypes.bool,
  garden: PropTypes.bool,
  nature: PropTypes.string,
  interval: PropTypes.string,
  type: PropTypes.string,
};

export default Details;
