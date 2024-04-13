import React, { useEffect, useState } from "react";

import "./resume.css";
import { getDatabase, ref, get } from "firebase/database";

const Resume = () => {
  const [approvedRentListings, setApprovedRentListings] = useState(0);
  const [requestedRentListings, setRequestedRentListings] = useState(0);
  const [refusedRentListings, setRefusedRentListings] = useState(0);
  const [approvedSaleListings, setApprovedSaleListings] = useState(0);
  const [requestedSaleListings, setRequestedSaleListings] = useState(0);
  const [refusedSaleListings, setRefusedSaleListings] = useState(0);
  const [approvedCommercialListings, setApprovedCommercialListings] =
    useState(0);
  const [requestedCommercialListings, setRequestedCommercialListings] =
    useState(0);
  const [refusedCommercialListings, setRefusedCommercialListings] = useState(0);

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

        let approvedRentCount = 0;
        let requestedRentCount = 0;
        let refusedRentCount = 0;
        let approvedSaleCount = 0;
        let requestedSaleCount = 0;
        let refusedSaleCount = 0;
        let approvedCommercialCount = 0;
        let requestedCommercialCount = 0;
        let refusedCommercialCount = 0;

        if (saleData) {
          Object.values(saleData).forEach((listing) => {
            if (listing.nature === "commercial") {
              switch (listing.state) {
                case "approved":
                  approvedCommercialCount++;
                  break;
                case "requested":
                  requestedCommercialCount++;
                  break;
                case "refused":
                  refusedCommercialCount++;
                  break;
                default:
                  break;
              }
            } else {
              switch (listing.state) {
                case "approved":
                  approvedSaleCount++;
                  break;
                case "requested":
                  requestedSaleCount++;
                  break;
                case "refused":
                  refusedSaleCount++;
                  break;
                default:
                  break;
              }
            }
          });
        }

        if (rentData) {
          Object.values(rentData).forEach((listing) => {
            if (listing.nature === "commercial") {
              switch (listing.state) {
                case "approved":
                  approvedCommercialCount++;
                  break;
                case "requested":
                  requestedCommercialCount++;
                  break;
                case "refused":
                  refusedCommercialCount++;
                  break;
                default:
                  break;
              }
            } else {
              switch (listing.state) {
                case "approved":
                  approvedRentCount++;
                  break;
                case "requested":
                  requestedRentCount++;
                  break;
                case "refused":
                  refusedRentCount++;
                  break;
                default:
                  break;
              }
            }
          });
        }

        setApprovedRentListings(approvedRentCount);
        setRequestedRentListings(requestedRentCount);
        setRefusedRentListings(refusedRentCount);
        setApprovedSaleListings(approvedSaleCount);
        setRequestedSaleListings(requestedSaleCount);
        setRefusedSaleListings(refusedSaleCount);
        setApprovedCommercialListings(approvedCommercialCount);
        setRequestedCommercialListings(requestedCommercialCount);
        setRefusedCommercialListings(refusedCommercialCount);
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
            <span className="resume-text-black">{requestedSaleListings}</span>
            <span className="resume-text-black">{approvedSaleListings}</span>
            <span className="resume-text-black">{refusedSaleListings}</span>
            <span className="resume-text-black">
              {requestedSaleListings +
                approvedSaleListings +
                refusedSaleListings}
            </span>
          </div>
          <div className="resume-td">
            <span className="resume-text-black">Loyer</span>
            <span className="resume-text-black">{requestedRentListings}</span>
            <span className="resume-text-black">{approvedRentListings}</span>
            <span className="resume-text-black">{refusedRentListings}</span>
            <span className="resume-text-black">
              {requestedRentListings +
                approvedRentListings +
                refusedRentListings}
            </span>
          </div>
          <div className="resume-td">
            <span className="resume-text-black">Commercial</span>
            <span className="resume-text-black">
              {requestedCommercialListings}
            </span>
            <span className="resume-text-black">
              {approvedCommercialListings}
            </span>
            <span className="resume-text-black">
              {refusedCommercialListings}
            </span>
            <span className="resume-text-black">
              {requestedCommercialListings +
                approvedCommercialListings +
                refusedCommercialListings}
            </span>
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
