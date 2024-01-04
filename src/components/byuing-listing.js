import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";

import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

import "./byuing-listing.css";

const ByuingListing = (props) => {
  const [thumbnailURL, setThumbnailURL] = useState("");

  useEffect(() => {
    // Function to fetch the first image URL for a listing from Firebase Storage
    const fetchThumbnail = async () => {
      try {
        const storage = getStorage();
        const listingRef = ref(storage, `sale/${props.id}`);
        // List all items in the folder
        const listingImages = await listAll(listingRef);

        // Get the first image URL
        if (listingImages.items.length > 0) {
          const firstImageRef = listingImages.items[0];
          const thumbnailURL = await getDownloadURL(firstImageRef);
          setThumbnailURL(thumbnailURL);
        }
      } catch (error) {
        console.error("Error fetching thumbnail:", error);
      }
    };

    // Call the function to fetch the thumbnail URL
    fetchThumbnail();
  }, [props.id]);

  const newBody =
    props.body.length > 250 ? `${props.body.substring(0, 250)}...` : props.body;

  return (
    <div className={`byuing-listing-blog-post-card ${props.rootClassName} `}>
      <div
        className="byuing-listing-hero"
        style={{
          backgroundImage: `url(${thumbnailURL})`,
        }}
      >
        <div className="byuing-listing-top">
          <div className="byuing-listing-images">
            <svg
              viewBox="0 0 1097.142857142857 1024"
              className="byuing-listing-icon"
            >
              <path
                d="M548.571 384c90.857 0 164.571 73.714 164.571 164.571s-73.714 164.571-164.571 164.571-164.571-73.714-164.571-164.571 73.714-164.571 164.571-164.571zM950.857 146.286c80.571 0 146.286 65.714 146.286 146.286v512c0 80.571-65.714 146.286-146.286 146.286h-804.571c-80.571 0-146.286-65.714-146.286-146.286v-512c0-80.571 65.714-146.286 146.286-146.286h128l29.143-77.714c14.286-37.714 58.857-68.571 98.857-68.571h292.571c40 0 84.571 30.857 98.857 68.571l29.143 77.714h128zM548.571 804.571c141.143 0 256-114.857 256-256s-114.857-256-256-256-256 114.857-256 256 114.857 256 256 256z"
                className=""
              ></path>
            </svg>
            <span className="byuing-listing-text">{props.photos}</span>
          </div>
        </div>
        <div className="byuing-listing-bottom">
          <div className="byuing-listing-location">
            <svg
              viewBox="0 0 585.1428571428571 1024"
              className="byuing-listing-icon02"
            >
              <path
                d="M438.857 365.714c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM585.143 365.714c0 34.857-4 70.857-18.857 102.286l-208 442.286c-12 25.143-38.286 40.571-65.714 40.571s-53.714-15.429-65.143-40.571l-208.571-442.286c-14.857-31.429-18.857-67.429-18.857-102.286 0-161.714 130.857-292.571 292.571-292.571s292.571 130.857 292.571 292.571z"
                className=""
              ></path>
            </svg>
            <span className="byuing-listing-text2">
              {props.location} | {props.city}
            </span>
          </div>
        </div>
      </div>
      <div className="byuing-listing-container">
        <span className="byuing-listing-text3">{props.header}</span>
        <span className="byuing-listing-text4">{props.interval}</span>
        <span className="byuing-listing-text5">{newBody}</span>
        <div className="byuing-listing-container1">
          <svg
            viewBox="0 0 1170.2857142857142 1024"
            className="byuing-listing-icon04"
          >
            <path
              d="M146.286 585.143h987.429c20 0 36.571 16.571 36.571 36.571v256h-146.286v-146.286h-877.714v146.286h-146.286v-694.857c0-20 16.571-36.571 36.571-36.571h73.143c20 0 36.571 16.571 36.571 36.571v402.286zM475.429 402.286c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM1170.286 548.571v-36.571c0-121.143-98.286-219.429-219.429-219.429h-402.286c-20 0-36.571 16.571-36.571 36.571v219.429h658.286z"
              className=""
            ></path>
          </svg>
          <span className="byuing-listing-text6">{props.beds}</span>
          <svg viewBox="0 0 1024 1024" className="byuing-listing-icon06">
            <path
              d="M950.857 621.714v109.714c0 65.143-28.571 122.857-73.143 163.429v110.857c0 10.286-8 18.286-18.286 18.286h-36.571c-10.286 0-18.286-8-18.286-18.286v-67.429c-22.857 8-47.429 12.571-73.143 12.571h-438.857c-25.714 0-50.286-4.571-73.143-12.571v62.857c0 12.571-8 22.857-18.286 22.857h-36.571c-10.286 0-18.286-10.286-18.286-22.857v-106.286c-44.571-40.571-73.143-98.286-73.143-163.429v-109.714h877.714zM402.286 384c0 10.286-8 18.286-18.286 18.286s-18.286-8-18.286-18.286 8-18.286 18.286-18.286 18.286 8 18.286 18.286zM438.857 347.429c0 10.286-8 18.286-18.286 18.286s-18.286-8-18.286-18.286 8-18.286 18.286-18.286 18.286 8 18.286 18.286zM402.286 310.857c0 10.286-8 18.286-18.286 18.286s-18.286-8-18.286-18.286 8-18.286 18.286-18.286 18.286 8 18.286 18.286zM475.429 310.857c0 10.286-8 18.286-18.286 18.286s-18.286-8-18.286-18.286 8-18.286 18.286-18.286 18.286 8 18.286 18.286zM438.857 274.286c0 10.286-8 18.286-18.286 18.286s-18.286-8-18.286-18.286 8-18.286 18.286-18.286 18.286 8 18.286 18.286zM402.286 237.714c0 10.286-8 18.286-18.286 18.286s-18.286-8-18.286-18.286 8-18.286 18.286-18.286 18.286 8 18.286 18.286zM1024 530.286v36.571c0 10.286-8 18.286-18.286 18.286h-987.429c-10.286 0-18.286-8-18.286-18.286v-36.571c0-10.286 8-18.286 18.286-18.286h54.857v-365.714c0-80.571 65.714-146.286 146.286-146.286 41.143 0 78.286 17.143 105.143 44.571 35.429-14.286 77.714-9.143 109.143 15.429l12.571-12.571c3.429-3.429 9.143-3.429 12.571 0l24 24c3.429 3.429 3.429 9.143 0 12.571l-179.429 179.429c-3.429 3.429-9.143 3.429-12.571 0l-24-24c-3.429-3.429-3.429-9.143 0-12.571l12.571-12.571c-27.429-34.857-30.857-82.857-9.714-121.143-13.143-12.571-30.857-20-50.286-20-40.571 0-73.143 32.571-73.143 73.143v365.714h859.429c10.286 0 18.286 8 18.286 18.286zM512 274.286c0 10.286-8 18.286-18.286 18.286s-18.286-8-18.286-18.286 8-18.286 18.286-18.286 18.286 8 18.286 18.286zM475.429 237.714c0 10.286-8 18.286-18.286 18.286s-18.286-8-18.286-18.286 8-18.286 18.286-18.286 18.286 8 18.286 18.286zM438.857 201.143c0 10.286-8 18.286-18.286 18.286s-18.286-8-18.286-18.286 8-18.286 18.286-18.286 18.286 8 18.286 18.286zM548.571 237.714c0 10.286-8 18.286-18.286 18.286s-18.286-8-18.286-18.286 8-18.286 18.286-18.286 18.286 8 18.286 18.286zM512 201.143c0 10.286-8 18.286-18.286 18.286s-18.286-8-18.286-18.286 8-18.286 18.286-18.286 18.286 8 18.286 18.286zM475.429 164.571c0 10.286-8 18.286-18.286 18.286s-18.286-8-18.286-18.286 8-18.286 18.286-18.286 18.286 8 18.286 18.286zM585.143 201.143c0 10.286-8 18.286-18.286 18.286s-18.286-8-18.286-18.286 8-18.286 18.286-18.286 18.286 8 18.286 18.286zM548.571 164.571c0 10.286-8 18.286-18.286 18.286s-18.286-8-18.286-18.286 8-18.286 18.286-18.286 18.286 8 18.286 18.286zM621.714 164.571c0 10.286-8 18.286-18.286 18.286s-18.286-8-18.286-18.286 8-18.286 18.286-18.286 18.286 8 18.286 18.286z"
              className=""
            ></path>
          </svg>
          <span className="byuing-listing-text7">{props.baths}</span>
          <svg viewBox="0 0 1024 1024" className="byuing-listing-icon08">
            <path
              d="M853.333 256c0-25.045-10.965-49.792-32-66.645-36.821-29.44-90.496-23.509-119.979 13.312l-118.997 148.736-104.491-78.336c-36.864-27.648-89.045-21.035-117.845 14.976l-170.667 213.333c-12.544 15.701-18.688 34.603-18.688 53.291v128h682.667v-426.667z"
              className=""
            ></path>
            <path
              d="M853.333 810.667h-682.667c-23.552 0-42.667 19.072-42.667 42.667s19.115 42.667 42.667 42.667h682.667c23.552 0 42.667-19.072 42.667-42.667s-19.115-42.667-42.667-42.667z"
              className=""
            ></path>
          </svg>
          <span className="byuing-listing-text8">{props.area} m²</span>
        </div>
      </div>
    </div>
  );
};

ByuingListing.defaultProps = {
  id: "0",
  photos: "",
  price: "",
  baths: "",
  header: "",
  city: "",
  location: "",
  area: "",
  body: "",
  rootClassName: "",
  beds: "",
  cars: "",
  pool: "",
  garden: "",
  nature: "",
  interval: "",
};

ByuingListing.propTypes = {
  id: PropTypes.string,
  photos: PropTypes.number,
  price: PropTypes.string,
  baths: PropTypes.string,
  header: PropTypes.string,
  city: PropTypes.string,
  location: PropTypes.string,
  area: PropTypes.string,
  body: PropTypes.string,
  rootClassName: PropTypes.string,
  beds: PropTypes.string,
  cars: PropTypes.string,
  pool: PropTypes.bool,
  garden: PropTypes.bool,
  nature: PropTypes.string,
  interval: PropTypes.string,
};

export default ByuingListing;
