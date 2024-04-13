import React, { useEffect, useState } from "react";

import "./resume.css";
import { getDatabase, ref, get } from "firebase/database";

const Resume = () => {
  const [rentListings, setRentListings] = useState(0);
  const [saleListings, setSaleListings] = useState(0);
  const [commercialListings, setCommercialListings] = useState(0);

  useEffect(() => {
    const fetchTotalListings = async () => {
      const database = getDatabase();
      const saleListingsRef = ref(database, "listings/sale");
      const rentListingsRef = ref(database, "listings/rent");

      try {
        const [saleSnapshot, rentSnapshot] = await Promise.all([
          get(saleListingsRef),
          get(rentListingsRef),
        ]);

        const saleData = saleSnapshot.val();
        const rentData = rentSnapshot.val();

        let saleCount = 0;
        let rentCount = 0;
        let commercialCount = 0;

        if (saleData) {
          Object.values(saleData).forEach((listing) => {
            if (listing.nature === "commercial") {
              commercialCount++;
            } else {
              saleCount++;
            }
          });
        }

        if (rentData) {
          Object.values(rentData).forEach((listing) => {
            if (listing.nature === "commercial") {
              commercialCount++;
            } else {
              rentCount++;
            }
          });
        }

        setSaleListings(saleCount);
        setRentListings(rentCount);
        setCommercialListings(commercialCount);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchTotalListings();
  }, []);

  return (
    <div className="resume-container">
      <div className="resume-contents">
        <div className="resume-table-1">
          <div className="resume-th">
            <span className="resume-text">Catégorie</span>
            <span className="resume-text">En Attente</span>
            <span className="resume-text">Approuvé</span>
            <span className="resume-text">Refusé</span>
            <span className="resume-text">Total</span>
          </div>
          <div className="resume-td">
            <span className="resume-text-black">Vente</span>
            <span className="resume-text-black">X</span>
            <span className="resume-text-black">X</span>
            <span className="resume-text-black">X</span>
            <span className="resume-text-black">{saleListings}</span>
          </div>
          <div className="resume-td">
            <span className="resume-text-black">Loyer</span>
            <span className="resume-text-black">X</span>
            <span className="resume-text-black">X</span>
            <span className="resume-text-black">X</span>
            <span className="resume-text-black">{rentListings}</span>
          </div>
          <div className="resume-td">
            <span className="resume-text-black">Commercial</span>
            <span className="resume-text-black">X</span>
            <span className="resume-text-black">X</span>
            <span className="resume-text-black">X</span>
            <span className="resume-text-black">{commercialListings}</span>
          </div>
        </div>
      </div>
      <div className="resume-contents1">
        <div className="resume-table-2">
          <div className="resume-th">
            <span className="resume-text">Demandes de contact</span>
            <span className="resume-text">Répondus</span>
            <span className="resume-text">en attente</span>
            <span className="resume-text">Total</span>
          </div>
          <div className="resume-td">
            <span className="resume-text-black">X</span>
            <span className="resume-text-black">X</span>
            <span className="resume-text-black">X</span>
            <span className="resume-text-black">X</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
