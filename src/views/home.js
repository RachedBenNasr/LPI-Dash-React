import React, { useState } from "react";

import { Helmet } from "react-helmet";

import "./home.css";

const Home = (props) => {
  const [password, setPassword] = useState("");

  const Check = () => {
    const storedPassword = "TEST";

    password === storedPassword
      ? props.history.push("/data")
      : alert("mot de passe incorrecte!");
  };

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
              type="password"
              required="true"
              placeholder="Mot de passe"
              className="home-textinput input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="home-button button"
              onClick={Check}
            >
              Envoyer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
