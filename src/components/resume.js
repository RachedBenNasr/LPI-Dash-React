import React from 'react'

import PropTypes from 'prop-types'

import './resume.css'

const Resume = (props) => {
  return (
    <div className="resume-container">
      <div className="resume-contents">
        <div className="resume-table-1">
          <div className="resume-th">
            <span className="resume-text">{props.text4}</span>
            <span className="resume-text01">{props.text43}</span>
            <span className="resume-text02">{props.text42}</span>
            <span className="resume-text03">{props.text41}</span>
            <span className="resume-text04">{props.text411}</span>
          </div>
          <div className="resume-td">
            <span className="resume-text05">{props.text44}</span>
            <span className="resume-text06">{props.text431}</span>
            <span className="resume-text07">{props.text421}</span>
            <span className="resume-text08">{props.text412}</span>
            <span className="resume-text09">{props.text4111}</span>
          </div>
          <div className="resume-td1">
            <span className="resume-text10">{props.text442}</span>
            <span className="resume-text11">{props.text4312}</span>
            <span className="resume-text12">{props.text4212}</span>
            <span className="resume-text13">{props.text4122}</span>
            <span className="resume-text14">{props.text41112}</span>
          </div>
          <div className="resume-td2">
            <span className="resume-text15">{props.text441}</span>
            <span className="resume-text16">{props.text4311}</span>
            <span className="resume-text17">{props.text4211}</span>
            <span className="resume-text18">{props.text4121}</span>
            <span className="resume-text19">{props.text41111}</span>
          </div>
        </div>
      </div>
      <div className="resume-contents1">
        <div className="resume-table-2">
          <div className="resume-th1">
            <span className="resume-text20">{props.text45}</span>
            <span className="resume-text21">{props.text422}</span>
            <span className="resume-text22">{props.text413}</span>
            <span className="resume-text23">{props.text4112}</span>
          </div>
          <div className="resume-td3">
            <span className="resume-text24">{props.text443}</span>
            <span className="resume-text25">{props.text4213}</span>
            <span className="resume-text26">{props.text4123}</span>
            <span className="resume-text27">{props.text41113}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

Resume.defaultProps = {
  text41112: '45',
  text4111: '32',
  text421: '20',
  text4121: '2',
  text43: 'En Attente',
  text413: 'Non Répondus',
  text42: 'Approuvé',
  text411: 'Total',
  text412: '2',
  text422: 'Répondus',
  text4213: '20',
  text4123: '2',
  text41113: '32',
  text442: 'Location',
  text44: 'A Vendre',
  text4212: '30',
  text4312: '5',
  text443: 'A Vendre',
  text4122: '10',
  text441: 'Opportunités',
  text4211: '100',
  text431: '10',
  text4112: 'Total',
  text45: 'Demandes de contact',
  text4: 'Catégorie',
  text41: 'Refusé',
  text4311: '3',
  text41111: '105',
}

Resume.propTypes = {
  text41112: PropTypes.string,
  text4111: PropTypes.string,
  text421: PropTypes.string,
  text4121: PropTypes.string,
  text43: PropTypes.string,
  text413: PropTypes.string,
  text42: PropTypes.string,
  text411: PropTypes.string,
  text412: PropTypes.string,
  text422: PropTypes.string,
  text4213: PropTypes.string,
  text4123: PropTypes.string,
  text41113: PropTypes.string,
  text442: PropTypes.string,
  text44: PropTypes.string,
  text4212: PropTypes.string,
  text4312: PropTypes.string,
  text443: PropTypes.string,
  text4122: PropTypes.string,
  text441: PropTypes.string,
  text4211: PropTypes.string,
  text431: PropTypes.string,
  text4112: PropTypes.string,
  text45: PropTypes.string,
  text4: PropTypes.string,
  text41: PropTypes.string,
  text4311: PropTypes.string,
  text41111: PropTypes.string,
}

export default Resume
