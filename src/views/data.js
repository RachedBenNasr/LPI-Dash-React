import React, { useState } from "react";
import { Link, Route, Switch } from "react-router-dom";

import Resume from "../components/resume";
import Vente from "../components/vente";
import Loyer from "../components/loyer";
import Opportunite from "../components/opportunites";
import Feedback from "../components/feedback";

import { DateTimePrimitive } from "@teleporthq/react-components";
import { Helmet } from "react-helmet";

import "./data.css";

const Data = (props) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("");

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  return (
    <div className="data-container">
      <Helmet>
        <title>Tableau de bord</title>
        <meta property="og:title" content="Data - LPI-Dash" />
      </Helmet>
      <div className="data-left">
        <img alt="image" src="/horizontal-1500h.png" className="data-image" />
        <div className="data-separator"></div>
        <div
          className={`data-container0 ${
            selectedMenuItem === "resume" ? "selected" : "not-selected"
          }`}
          onClick={() => handleMenuItemClick("resume")}
        >
          <span className="data-text3 not-selected">Résumé</span>
        </div>
        <div
          className={`data-container1 ${
            selectedMenuItem === "vente" ? "selected" : "not-selected"
          }`}
          onClick={() => handleMenuItemClick("vente")}
        >
          <span className="data-text3 not-selected">Vente</span>
          <svg viewBox="0 0 877.7142857142857 1024" className="data-icon">
            <path d="M877.714 512c0 242.286-196.571 438.857-438.857 438.857s-438.857-196.571-438.857-438.857 196.571-438.857 438.857-438.857 438.857 196.571 438.857 438.857z"></path>
          </svg>
        </div>
        <div
          className={`data-container2 ${
            selectedMenuItem === "loyer" ? "selected" : "not-selected"
          }`}
          onClick={() => handleMenuItemClick("loyer")}
        >
          <span className="not-selected">Loyer</span>
          <svg viewBox="0 0 877.7142857142857 1024" className="data-icon2">
            <path d="M877.714 512c0 242.286-196.571 438.857-438.857 438.857s-438.857-196.571-438.857-438.857 196.571-438.857 438.857-438.857 438.857 196.571 438.857 438.857z"></path>
          </svg>
        </div>
        <div
          className={`data-container3 ${
            selectedMenuItem === "opportunites" ? "selected" : "not-selected"
          }`}
          onClick={() => handleMenuItemClick("opportunites")}
        >
          <span className="data-text5 not-selected">Commercial</span>
          <svg viewBox="0 0 877.7142857142857 1024" className="data-icon4">
            <path d="M877.714 512c0 242.286-196.571 438.857-438.857 438.857s-438.857-196.571-438.857-438.857 196.571-438.857 438.857-438.857 438.857 196.571 438.857 438.857z"></path>
          </svg>
        </div>
        <div
          className={`data-container4 ${
            selectedMenuItem === "feedback" ? "selected" : "not-selected"
          }`}
          onClick={() => handleMenuItemClick("feedback")}
        >
          <span className="data-text6 ">Demandes de contact</span>
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
        <div id="Content" className="data-content">
          <Switch>
            <Route path="/data/resume" component={Resume} />
            <Route path="/data/vente" component={Vente} />
            <Route path="/data/loyer" component={Loyer} />
            <Route path="/data/opportunites" component={Opportunite} />
            <Route path="/data/feedback" component={Feedback} />
            {/* Default route, loads the appropriate component based on the selectedMenuItem */}
            <Route
              path="/data"
              render={() => {
                switch (selectedMenuItem) {
                  case "vente":
                    return <Vente />;
                  case "loyer":
                    return <Loyer />;
                  case "opportunites":
                    return <Opportunite />;
                  case "feedback":
                    return <Feedback />;
                  default:
                    return <Resume />;
                }
              }}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Data;
