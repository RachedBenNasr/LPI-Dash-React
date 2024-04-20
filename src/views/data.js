import React, { useEffect, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import { getDatabase, ref, get } from "firebase/database";

import Resume from "../components/resume";
import Vente from "../components/vente";
import Loyer from "../components/loyer";
import Opportunite from "../components/commercial";
import Feedback from "../components/feedback";

import { Helmet } from "react-helmet";

import "./data.css";

const Data = () => {
  const currentDate = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [selectedMenuItem, setSelectedMenuItem] = useState("");

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  const [unseenRequests, setUnseenRequests] = useState(0);

  const [totalSaleRequests, setTotalSaleRequests] = useState(0);
  const [totalRentRequests, setTotalRentRequests] = useState(0);
  const [totalCommRequests, setTotalCommRequests] = useState(0);

  useEffect(() => {
    const fetchNumberOfRequests = async () => {
      const database = getDatabase();
      const contactRequestsRef = ref(database, "requests/contactRequests");
      const quoteRequestsRef = ref(database, "requests/quoteRequests");

      let totalUnseenContactRequests = 0;
      let totalUnseenQuoteRequests = 0;

      try {
        const contactSnapshot = await get(contactRequestsRef);
        const contactData = contactSnapshot.val();

        if (contactData) {
          const requestsArray = Object.values(contactData);
          totalUnseenContactRequests = requestsArray.reduce(
            (count, request) => {
              if (request.state === "unseen") {
                return count + 1;
              }
              return count;
            },
            0
          );
        }

        const quoteSnapshot = await get(quoteRequestsRef);
        const quoteData = quoteSnapshot.val();

        if (quoteData) {
          const requestsArray = Object.values(quoteData);
          totalUnseenQuoteRequests = requestsArray.reduce((count, request) => {
            if (request.state === "unseen") {
              return count + 1;
            }
            return count;
          }, 0);
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
      }

      const totalUnseenRequests =
        totalUnseenContactRequests + totalUnseenQuoteRequests;
      setUnseenRequests(totalUnseenRequests);
    };

    fetchNumberOfRequests();

    const fetchSaleRequests = async () => {
      const database = getDatabase();
      const saleListingsRef = ref(database, "listings/sale");

      let temp = 0;

      try {
        const saleListingsSnapshot = await get(saleListingsRef);
        const saleListingsData = saleListingsSnapshot.val();

        if (saleListingsData) {
          const listingsArray = Object.values(saleListingsData);
          temp = listingsArray.reduce((count, listing) => {
            if (listing.state === "requested" && listing.commercialType == "") {
              return count + 1;
            }
            return count;
          }, 0);
        }
      } catch (error) {
        console.error("Error fetching sale listings:", error);
      }

      setTotalSaleRequests(temp);
    };

    const fetchRentRequests = async () => {
      const database = getDatabase();
      const saleListingsRef = ref(database, "listings/rent");

      let temp = 0;

      try {
        const saleListingsSnapshot = await get(saleListingsRef);
        const saleListingsData = saleListingsSnapshot.val();

        if (saleListingsData) {
          const listingsArray = Object.values(saleListingsData);
          temp = listingsArray.reduce((count, listing) => {
            if (listing.state === "requested" && listing.commercialType == "") {
              return count + 1;
            }
            return count;
          }, 0);
        }
      } catch (error) {
        console.error("Error fetching rent listings:", error);
      }

      setTotalRentRequests(temp);
    };

    const fetchCommRequests = async () => {
      const database = getDatabase();
      const saleListingsRef = ref(database, "listings/sale");
      const rentListingsRef = ref(database, "listings/rent");

      let temp1 = 0;
      let temp2 = 0;

      try {
        const saleListingsSnapshot = await get(saleListingsRef);
        const saleListingsData = saleListingsSnapshot.val();

        if (saleListingsData) {
          const listingsArray = Object.values(saleListingsData);
          temp1 = listingsArray.reduce((count, listing) => {
            if (listing.state === "requested" && listing.commercialType != "") {
              return count + 1;
            }
            return count;
          }, 0);
        }
      } catch (error) {
        console.error("Error fetching rent listings:", error);
      }
      try {
        const rentListingsSnapshot = await get(rentListingsRef);
        const rentListingsData = rentListingsSnapshot.val();

        if (rentListingsData) {
          const listingsArray = Object.values(rentListingsData);
          temp2 = listingsArray.reduce((count, listing) => {
            if (listing.state === "requested" && listing.commercialType != "") {
              return count + 1;
            }
            return count;
          }, 0);
        }
      } catch (error) {
        console.error("Error fetching rent listings:", error);
      }

      setTotalCommRequests(temp1 + temp2);
    };

    fetchRentRequests();
    fetchSaleRequests();
    fetchCommRequests();

    //Fetch every 2 mins
    const intervalId = setInterval(fetchNumberOfRequests, 60 * 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

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
          {totalSaleRequests != 0 && (
            <>
              <svg viewBox="0 0 877.7142857142857 1024" className="data-icon">
                <path d="M877.714 512c0 242.286-196.571 438.857-438.857 438.857s-438.857-196.571-438.857-438.857 196.571-438.857 438.857-438.857 438.857 196.571 438.857 438.857z"></path>
              </svg>
            </>
          )}
        </div>
        <div
          className={`data-container2 ${
            selectedMenuItem === "loyer" ? "selected" : "not-selected"
          }`}
          onClick={() => handleMenuItemClick("loyer")}
        >
          <span className="not-selected">Loyer</span>
          {totalRentRequests != 0 && (
            <>
              <svg viewBox="0 0 877.7142857142857 1024" className="data-icon">
                <path d="M877.714 512c0 242.286-196.571 438.857-438.857 438.857s-438.857-196.571-438.857-438.857 196.571-438.857 438.857-438.857 438.857 196.571 438.857 438.857z"></path>
              </svg>
            </>
          )}
        </div>
        <div
          className={`data-container3 ${
            selectedMenuItem === "commercial" ? "selected" : "not-selected"
          }`}
          onClick={() => handleMenuItemClick("commercial")}
        >
          <span className="data-text5 not-selected">Commercial</span>
          {totalCommRequests != 0 && (
            <>
              <svg viewBox="0 0 877.7142857142857 1024" className="data-icon">
                <path d="M877.714 512c0 242.286-196.571 438.857-438.857 438.857s-438.857-196.571-438.857-438.857 196.571-438.857 438.857-438.857 438.857 196.571 438.857 438.857z"></path>
              </svg>
            </>
          )}
        </div>
        <div
          className={`data-container4 ${
            selectedMenuItem === "feedback" ? "selected" : "not-selected"
          }`}
          onClick={() => handleMenuItemClick("feedback")}
        >
          <span className="data-text6">Messages</span>
          {unseenRequests != 0 && (
            <>
              <svg viewBox="0 0 877.7142857142857 1024" className="data-icon6">
                <path d="M877.714 512c0 242.286-196.571 438.857-438.857 438.857s-438.857-196.571-438.857-438.857 196.571-438.857 438.857-438.857 438.857 196.571 438.857 438.857z"></path>
              </svg>
            </>
          )}
        </div>
        <div className="data-separator1"></div>
        <Link to="/" className="data-navlink">
          Déconnexion
        </Link>
      </div>
      <div className="data-right">
        <header data-role="Header" className="data-header">
          <span>
            <b>{currentDate}</b>
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
            <Route path="/data/commercial" component={Opportunite} />
            <Route path="/data/feedback" component={Feedback} />

            <Route
              path="/data"
              render={() => {
                switch (selectedMenuItem) {
                  case "vente":
                    return <Vente />;
                  case "loyer":
                    return <Loyer />;
                  case "commercial":
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
