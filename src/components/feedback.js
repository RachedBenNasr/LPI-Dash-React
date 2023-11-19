import React from 'react'

import PropTypes from 'prop-types'

import './feedback.css'

const Feedback = (props) => {
  return (
    <div className={`feedback-container ${props.rootClassName} `}>
      <div className="feedback-container1">
        <span className="feedback-text">{props.title}</span>
        <div className="feedback-separator"></div>
        <div className="feedback-approved">
          <span className="feedback-text1">{props.type}</span>
          <div className="feedback-separator1"></div>
        </div>
        <div className="feedback-denied">
          <span className="feedback-text2">{props.type2}</span>
        </div>
      </div>
    </div>
  )
}

Feedback.defaultProps = {
  title: 'Demandes de contact',
  type2: 'Messages déjà lus',
  type: 'Messages non lus',
  rootClassName: '',
}

Feedback.propTypes = {
  title: PropTypes.string,
  type2: PropTypes.string,
  type: PropTypes.string,
  rootClassName: PropTypes.string,
}

export default Feedback
