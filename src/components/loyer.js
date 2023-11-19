import React from 'react'

import PropTypes from 'prop-types'

import './loyer.css'

const Loyer = (props) => {
  return (
    <div className={`loyer-container ${props.rootClassName} `}>
      <span className="loyer-text">{props.title}</span>
      <div className="loyer-separator"></div>
      <div className="loyer-new">
        <span className="loyer-text1">{props.type}</span>
        <div className="loyer-separator1"></div>
        <span className="loyer-text2">{props.placeholder}</span>
      </div>
      <div className="loyer-approved">
        <span className="loyer-text3">{props.type1}</span>
        <div className="loyer-separator2"></div>
        <span className="loyer-text4">{props.placeholder1}</span>
      </div>
      <div className="loyer-denied">
        <span className="loyer-text5">{props.type2}</span>
        <div className="loyer-separator3"></div>
        <span className="loyer-text6">{props.placeholder2}</span>
      </div>
    </div>
  )
}

Loyer.defaultProps = {
  type1: 'annonces approuvées',
  placeholder1: 'Approved table goes here',
  placeholder: 'undecided table goes here',
  rootClassName: '',
  type2: 'annonces refusées',
  placeholder2: 'Denied table goes here',
  title: 'Proprietés a vendre',
  type: 'nouvelles annonces',
}

Loyer.propTypes = {
  type1: PropTypes.string,
  placeholder1: PropTypes.string,
  placeholder: PropTypes.string,
  rootClassName: PropTypes.string,
  type2: PropTypes.string,
  placeholder2: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
}

export default Loyer
