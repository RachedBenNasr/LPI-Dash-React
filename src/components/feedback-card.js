import React from 'react'

import PropTypes from 'prop-types'

import './feedback-card.css'

const FeedbackCard = (props) => {
  return (
    <div className={`feedback-card-container ${props.rootClassName} `}>
      <div className="feedback-card-container1">
        <span className="feedback-card-text">{props.name}</span>
        <div className="feedback-card-container2">
          <span className="feedback-card-text1">{props.mail}</span>
          <span className="feedback-card-text2">{props.divide}</span>
          <span className="feedback-card-text3">{props.num}</span>
        </div>
        <span className="feedback-card-text4">{props.body}</span>
      </div>
      <div className="feedback-card-container3">
        <svg
          viewBox="0 0 804.5714285714286 1024"
          className="feedback-card-icon"
        >
          <path d="M292.571 786.286v-402.286c0-10.286-8-18.286-18.286-18.286h-36.571c-10.286 0-18.286 8-18.286 18.286v402.286c0 10.286 8 18.286 18.286 18.286h36.571c10.286 0 18.286-8 18.286-18.286zM438.857 786.286v-402.286c0-10.286-8-18.286-18.286-18.286h-36.571c-10.286 0-18.286 8-18.286 18.286v402.286c0 10.286 8 18.286 18.286 18.286h36.571c10.286 0 18.286-8 18.286-18.286zM585.143 786.286v-402.286c0-10.286-8-18.286-18.286-18.286h-36.571c-10.286 0-18.286 8-18.286 18.286v402.286c0 10.286 8 18.286 18.286 18.286h36.571c10.286 0 18.286-8 18.286-18.286zM274.286 219.429h256l-27.429-66.857c-1.714-2.286-6.857-5.714-9.714-6.286h-181.143c-3.429 0.571-8 4-9.714 6.286zM804.571 237.714v36.571c0 10.286-8 18.286-18.286 18.286h-54.857v541.714c0 62.857-41.143 116.571-91.429 116.571h-475.429c-50.286 0-91.429-51.429-91.429-114.286v-544h-54.857c-10.286 0-18.286-8-18.286-18.286v-36.571c0-10.286 8-18.286 18.286-18.286h176.571l40-95.429c11.429-28 45.714-50.857 76-50.857h182.857c30.286 0 64.571 22.857 76 50.857l40 95.429h176.571c10.286 0 18.286 8 18.286 18.286z"></path>
        </svg>
        <svg viewBox="0 0 1024 1024" className="feedback-card-icon2">
          <path d="M954.857 323.429c0 14.286-5.714 28.571-16 38.857l-491.429 491.429c-10.286 10.286-24.571 16-38.857 16s-28.571-5.714-38.857-16l-284.571-284.571c-10.286-10.286-16-24.571-16-38.857s5.714-28.571 16-38.857l77.714-77.714c10.286-10.286 24.571-16 38.857-16s28.571 5.714 38.857 16l168 168.571 374.857-375.429c10.286-10.286 24.571-16 38.857-16s28.571 5.714 38.857 16l77.714 77.714c10.286 10.286 16 24.571 16 38.857z"></path>
        </svg>
      </div>
    </div>
  )
}

FeedbackCard.defaultProps = {
  name: 'foulen',
  num: '20111222',
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  mail: 'test@test.com',
  rootClassName: '',
  divide: '|',
  text: 'Text',
}

FeedbackCard.propTypes = {
  name: PropTypes.string,
  num: PropTypes.string,
  body: PropTypes.string,
  mail: PropTypes.string,
  rootClassName: PropTypes.string,
  divide: PropTypes.string,
  text: PropTypes.string,
}

export default FeedbackCard
