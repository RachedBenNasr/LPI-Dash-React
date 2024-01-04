import React from "react";

import PropTypes from "prop-types";

import "./opportunites.css";

const opportunites = (props) => {
  return (
    <div className="opportunites-container">
      <span className="opportunites-text">{props.title}</span>
      <div className="opportunites-separator"></div>
      <div className="opportunites-new">
        <span className="opportunites-text1">{props.type}</span>
        <div className="opportunites-separator1"></div>
        <span className="opportunites-text2">{props.placeholder}</span>
      </div>
      <div className="opportunites-approved">
        <span className="opportunites-text3">{props.type1}</span>
        <div className="opportunites-separator2"></div>
        <span className="opportunites-text4">{props.placeholder1}</span>
      </div>
      <div className="opportunites-denied">
        <span className="opportunites-text5">{props.type2}</span>
        <div className="opportunites-separator3"></div>
        <span className="opportunites-text6">{props.placeholder2}</span>
      </div>
    </div>
  );
};

opportunites.defaultProps = {
  placeholder2: "Denied table goes here",
  type2: "annonces refusées",
  title: "Opportunités a vendre",
  type: "nouvelles annonces",
  placeholder1: "Approved table goes here",
  type1: "annonces approuvées",
  rootClassName: "",
  placeholder: "undecided table goes here",
};

opportunites.propTypes = {
  placeholder2: PropTypes.string,
  type2: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  placeholder1: PropTypes.string,
  type1: PropTypes.string,
  rootClassName: PropTypes.string,
  placeholder: PropTypes.string,
};

export default opportunites;
