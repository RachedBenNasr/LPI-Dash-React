import React from 'react'

import { Helmet } from 'react-helmet'

import './home.css'

const Home = (props) => {
  return (
    <div className="home-container">
      <Helmet>
        <title>LPI-Dash</title>
        <meta property="og:title" content="LPI-Dash" />
      </Helmet>
      <header data-role="Accordion" className="home-header">
        <img alt="image" src="/horizontal-200h.png" className="home-image" />
        <div className="home-separator"></div>
        <span className="home-text">Admin Dashboard</span>
      </header>
      <div className="home-hero">
        <div className="home-banner">
          <span className="home-text1">saisissez votre mot de passe</span>
          <div className="home-container1">
            <input
              type="text"
              required="true"
              placeholder="Mot de passe"
              className="home-textinput input"
            />
            <button type="submit" className="home-button button">
              Envoyer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
