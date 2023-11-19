import React from 'react'

import PropTypes from 'prop-types'

import './vente.css'

const Vente = (props) => {
  return (
    <div className="vente-container">
      <span className="vente-text">{props.title}</span>
      <div className="vente-separator"></div>
      <div className="vente-new">
        <span className="vente-text1">{props.type}</span>
        <div className="vente-separator1"></div>
        <span className="vente-text2">{props.placeholder}</span>
      </div>
      <div className="vente-approved">
        <span className="vente-text3">{props.type1}</span>
        <div className="vente-separator2"></div>
        <span className="vente-text4">{props.placeholder1}</span>
      </div>
      <div className="vente-denied">
        <span className="vente-text5">{props.type2}</span>
        <div className="vente-separator3"></div>
        <span className="vente-text6">{props.placeholder2}</span>
      </div>
    </div>
  )
}

Vente.defaultProps = {
  placeholder2: 'Denied table goes here',
  type2: 'annonces refusées',
  title: 'Proprietés a vendre',
  type: 'nouvelles annonces',
  placeholder1: 'Approved table goes here',
  type1: 'annonces approuvées',
  rootClassName: '',
  placeholder: 'undecided table goes here',
}

Vente.propTypes = {
  placeholder2: PropTypes.string,
  type2: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  placeholder1: PropTypes.string,
  type1: PropTypes.string,
  rootClassName: PropTypes.string,
  placeholder: PropTypes.string,
}

export default Vente
