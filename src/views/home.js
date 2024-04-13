import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import { getDatabase, ref, get } from "firebase/database";
import "./home.css";

const Home = (props) => {
  const [password, setPassword] = useState("");
  const [storedPasswordHash, setStoredPasswordHash] = useState("");

  useEffect(() => {
    // Fetch the hashed password from Firebase
    const fetchPasswordHash = async () => {
      try {
        const database = getDatabase();
        const passwordRef = ref(database, "secrets/hashes");
        const snapshot = await get(passwordRef);
        if (snapshot.exists()) {
          const hash = snapshot.val();
          setStoredPasswordHash(hash);
        } else {
          console.error("Password hash not found in Firebase");
        }
      } catch (error) {
        console.error("Error fetching password hash:", error);
      }
    };
    fetchPasswordHash();
  }, []);

  const Check = () => {
    // Hash the input password using SHA-256
    const hashedInputPassword = hashFunction(password);

    // Compare hashed input with hashed stored password
    if (hashedInputPassword === storedPasswordHash) {
      props.history.push("/data");
    } else {
      alert("Mot de passe incorrect !");
    }
  };

  const hashFunction = (password) => {
    // Implement SHA-256 hashing function
    const sha256 = require("crypto-js/sha256");
    return sha256(password).toString();
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
          <span className="home-text1">Saisissez votre mot de passe</span>
          <div className="home-container1">
            <input
              type="password"
              required={true}
              placeholder="Mot de passe"
              className="home-textinput input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
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
