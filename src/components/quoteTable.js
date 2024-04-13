import React, { useEffect, useState } from "react";
import "../components/feedback.css";
import { getDatabase, ref, get, update, remove } from "firebase/database";

const QuoteRequests = () => {
  const [pendingQuoteRequests, setPendingQuoteRequests] = useState([]);
  const [treatedQuoteRequests, setTreatedQuoteRequests] = useState([]);

  useEffect(() => {
    const fetchQuoteRequests = async () => {
      const database = getDatabase();
      const quoteRequestsRef = ref(database, "quoteRequests");

      try {
        const quoteSnapshot = await get(quoteRequestsRef);
        const quoteData = quoteSnapshot.val();

        if (quoteData) {
          const requestsArray = Object.values(quoteData);
          const pendingRequests = requestsArray.filter(
            (request) => request.state === "unseen"
          );
          const treatedRequests = requestsArray.filter(
            (request) => request.state === "seen"
          );

          setPendingQuoteRequests(pendingRequests);
          setTreatedQuoteRequests(treatedRequests);
        }
      } catch (error) {
        console.error("Error fetching quote requests:", error);
      }
    };

    fetchQuoteRequests();
  }, []);

  const markAsSeen = async (requestId) => {
    const database = getDatabase();
    const quoteRequestsRef = ref(database, `quoteRequests/${requestId}`);

    try {
      await update(quoteRequestsRef, {
        state: "seen",
      });

      // Fetch updated requests
      const quoteSnapshot = await get(ref(database, "quoteRequests"));
      const quoteData = quoteSnapshot.val();

      if (quoteData) {
        const requestsArray = Object.values(quoteData);
        const pendingRequests = requestsArray.filter(
          (request) => request.state === "unseen"
        );
        const treatedRequests = requestsArray.filter(
          (request) => request.state === "seen"
        );

        setPendingQuoteRequests(pendingRequests);
        setTreatedQuoteRequests(treatedRequests);
      }
    } catch (error) {
      console.error("Error marking request as seen:", error);
    }
  };

  const deleteRequest = async (requestId) => {
    const database = getDatabase();
    const quoteRequestsRef = ref(database, `requests/quoteRequests`);

    try {
      await remove(quoteRequestsRef);

      // Fetch updated requests
      const quoteSnapshot = await get(ref(database, "quoteRequests"));
      const quoteData = quoteSnapshot.val();

      if (quoteData) {
        const requestsArray = Object.values(quoteData);
        const pendingRequests = requestsArray.filter(
          (request) => request.state === "unseen"
        );
        const treatedRequests = requestsArray.filter(
          (request) => request.state === "seen"
        );

        setPendingQuoteRequests(pendingRequests);
        setTreatedQuoteRequests(treatedRequests);
      }
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  return (
    <div className="feedback-container">
      <div className="feedback-section">
        <div className="feedback-section-header">
          <span className="feedback-section-title">En attente</span>
        </div>
        <div className="quote-requests">
          <table className="quote-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingQuoteRequests.map((request) => (
                <tr key={request.requestid}>
                  <td>
                    <a href={`mailto:${request.email}`}>{request.email}</a>
                  </td>
                  <td>{new Date(request.dateTime).toLocaleString()}</td>
                  <td>
                    <button
                      className="action-btn"
                      onClick={() => markAsSeen(request.requestid)}
                    >
                      Marquer comme vu
                    </button>
                    <button
                      className="action-btn"
                      onClick={() => deleteRequest(request.requestid)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="feedback-section">
        <div className="feedback-section-header">
          <span className="feedback-section-title">Treatées</span>
        </div>
        <div className="quote-requests">
          <table className="quote-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {treatedQuoteRequests.map((request) => (
                <tr key={request.requestid}>
                  <td>
                    <a href={`mailto:${request.email}`}>{request.email}</a>
                  </td>
                  <td>{new Date(request.dateTime).toLocaleString()}</td>
                  <td>
                    <button
                      className="action-btn"
                      onClick={() => deleteRequest(request.requestid)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QuoteRequests;
