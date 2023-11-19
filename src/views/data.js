import React from 'react'
import { Link } from 'react-router-dom'

import { DateTimePrimitive } from '@teleporthq/react-components'
import { Helmet } from 'react-helmet'

import './data.css'

const Data = (props) => {
  return (
    <div className="data-container">
      <Helmet>
        <title>Data - LPI-Dash</title>
        <meta property="og:title" content="Data - LPI-Dash" />
      </Helmet>
      <div className="data-left">
        <img alt="image" src="/horizontal-1500h.png" className="data-image" />
        <div className="data-separator"></div>
        <span className="data-text not-selected">
          <span>Résumé</span>
          <br></br>
        </span>
        <div className="data-container1">
          <span className="data-text3 not-selected">Vente</span>
          <svg viewBox="0 0 877.7142857142857 1024" className="data-icon">
            <path d="M877.714 512c0 242.286-196.571 438.857-438.857 438.857s-438.857-196.571-438.857-438.857 196.571-438.857 438.857-438.857 438.857 196.571 438.857 438.857z"></path>
          </svg>
        </div>
        <div className="data-container2">
          <span className="not-selected">Loyer</span>
          <svg viewBox="0 0 877.7142857142857 1024" className="data-icon2">
            <path d="M877.714 512c0 242.286-196.571 438.857-438.857 438.857s-438.857-196.571-438.857-438.857 196.571-438.857 438.857-438.857 438.857 196.571 438.857 438.857z"></path>
          </svg>
        </div>
        <div className="data-container3">
          <span className="data-text5 not-selected">Opportunités</span>
          <svg viewBox="0 0 877.7142857142857 1024" className="data-icon4">
            <path d="M877.714 512c0 242.286-196.571 438.857-438.857 438.857s-438.857-196.571-438.857-438.857 196.571-438.857 438.857-438.857 438.857 196.571 438.857 438.857z"></path>
          </svg>
        </div>
        <div className="data-container4">
          <span className="data-text6 selected">Demandes de contact</span>
          <svg viewBox="0 0 877.7142857142857 1024" className="data-icon6">
            <path d="M877.714 512c0 242.286-196.571 438.857-438.857 438.857s-438.857-196.571-438.857-438.857 196.571-438.857 438.857-438.857 438.857 196.571 438.857 438.857z"></path>
          </svg>
        </div>
        <div className="data-separator1"></div>
        <Link to="/" className="data-navlink">
          Déconnexion
        </Link>
      </div>
      <div className="data-right">
        <header data-role="Header" className="data-header">
          <span>
            <DateTimePrimitive
              format="DD/MM/YYYY"
              date="Wed Sep 20 2023 15:54:25 GMT+0100 (Central European Standard Time)"
            ></DateTimePrimitive>
          </span>
          <span className="data-text7">Tableau de bord</span>
          <a
            href="https://lepointimmobilier.tn/"
            target="_blank"
            rel="noreferrer noopener"
            className="data-vutton button"
          >
            Site web
          </a>
        </header>
        <div id="Content" className="data-content"></div>
      </div>
    </div>
  )
}

export default Data
