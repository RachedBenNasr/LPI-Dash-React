import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDM-Zt-YIpUKD7CaSaVFHiJdY7HnD-A8p0",
  authDomain: "le-point-immobilier.firebaseapp.com",
  databaseURL:
    "https://le-point-immobilier-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "le-point-immobilier",
  storageBucket: "le-point-immobilier.appspot.com",
  messagingSenderId: "711594524556",
  appId: "1:711594524556:web:5926d2de9c7783c50de0a9",
  measurementId: "G-C3E7RVF0KP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import "./style.css";
import Home from "./views/home";
import Data from "./views/data";
import NotFound from "./views/not-found";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route component={Home} exact path="/" />
        <Route component={Data} exact path="/data" />
        <Route component={NotFound} path="**" />
        <Redirect to="**" />
      </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
