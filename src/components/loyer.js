import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

import "./vente.css";

import ByuingListing from "../components/buying-listing";
import Details from "../components/decisionDetails";

const Vente = (props) => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [requestedListings, setRequestedListings] = useState([]);
  const [approvedListings, setApprovedListings] = useState([]);
  const [deniedListings, setDeniedListings] = useState([]);

  const handleListingClick = (listing) => {
    setSelectedListing(listing);
    setDetailsVisible(true);
  };

  const handleCloseDetails = () => {
    setDetailsVisible(false);
    setSelectedListing(null);
  };

  useEffect(() => {
    const fetchRentListings = async () => {
      const database = getDatabase();
      const RentListingsRef = ref(database, "listings/rent");

      onValue(RentListingsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const deniedListingsArray = [];
          const approvedListingsArray = [];
          const requestedListingsArray = [];

          Object.values(data).forEach((listing) => {
            if (listing.state === "denied" && listing.nature != "commercial") {
              deniedListingsArray.push(listing);
            } else if (
              listing.state === "approved" &&
              listing.nature != "commercial"
            ) {
              approvedListingsArray.push(listing);
            } else if (
              listing.state === "requested" &&
              listing.nature != "commercial"
            ) {
              requestedListingsArray.push(listing);
            }
          });

          setDeniedListings(deniedListingsArray);
          setApprovedListings(approvedListingsArray);
          setRequestedListings(requestedListingsArray);
        }
      });
    };

    fetchRentListings();
  }, []);

  return (
    <div className="vente-container">
      <span className="vente-title">Loyer</span>
      <div className="vente-separator"></div>
      <div className="vente-list">
        <span className="vente-sub">Annonces demandées</span>
        <div className="vente-separator"></div>
        <div className="cards">
          {requestedListings.map((listing) => (
            <div key={listing.id} onClick={() => handleListingClick(listing)}>
              <ByuingListing
                id={listing.id}
                photos={listing.photos}
                price={listing.price}
                baths={listing.baths}
                header={listing.header}
                city={listing.city}
                location={listing.location}
                areaC={listing.areaC}
                body={listing.body}
                beds={listing.beds}
                cars={listing.cars}
                pool={listing.pool}
                garden={listing.garden}
                nature={listing.nature}
                interval={listing.interval}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="vente-list">
        <div className="vente-separator"></div>
        <span className="vente-sub">Annonces approuvées</span>
        <div className="vente-separator"></div>
        <div className="cards">
          {approvedListings.map((listing) => (
            <div key={listing.id} onClick={() => handleListingClick(listing)}>
              <ByuingListing
                id={listing.id}
                photos={listing.photos}
                price={listing.price}
                baths={listing.baths}
                header={listing.header}
                city={listing.city}
                location={listing.location}
                areaC={listing.areaC}
                body={listing.body}
                beds={listing.beds}
                cars={listing.cars}
                pool={listing.pool}
                garden={listing.garden}
                nature={listing.nature}
                interval={listing.interval}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="vente-list">
        <div className="vente-separator"></div>
        <span className="vente-sub">Annonces refusées</span>
        <div className="vente-separator"></div>
        <div className="cards">
          {deniedListings.map((listing) => (
            <div key={listing.id} onClick={() => handleListingClick(listing)}>
              <ByuingListing
                id={listing.id}
                photos={listing.photos}
                price={listing.price}
                baths={listing.baths}
                header={listing.header}
                city={listing.city}
                location={listing.location}
                areaC={listing.areaC}
                body={listing.body}
                beds={listing.beds}
                cars={listing.cars}
                pool={listing.pool}
                garden={listing.garden}
                nature={listing.nature}
                interval={listing.interval}
              />
            </div>
          ))}
        </div>
      </div>
      {detailsVisible && (
        <>
          <div className="overlay" onClick={handleCloseDetails}></div>

          <Details
            listingId={selectedListing.id}
            title={selectedListing.header}
            photos={selectedListing.photos}
            price={selectedListing.price}
            baths={selectedListing.baths}
            header={selectedListing.header}
            location={selectedListing.location}
            areaNC={selectedListing.areaNC}
            areaC={selectedListing.areaC}
            body={selectedListing.body}
            beds={selectedListing.beds}
            garage={selectedListing.garage}
            pool={selectedListing.pool}
            garden={selectedListing.garden}
            nature={selectedListing.nature}
            interval={selectedListing.interval}
            closeDetails={handleCloseDetails}
            type={selectedListing.type}
            city={selectedListing.city} // Added
            commercialType={selectedListing.commercialType} // Added
            dateTime={selectedListing.dateTime} // Added
            email={selectedListing.email} // Added
            phoneNumber={selectedListing.phoneNumber} // Added
            propertyTitle={selectedListing.propertyTitle} // Added
            state={selectedListing.state} // Added
            viabilise={selectedListing.viabilise} // Added
            yearBuilt={selectedListing.yearBuilt}
          />
        </>
      )}
    </div>
  );
};

export default Vente;
