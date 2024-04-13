import React, { useEffect, useState } from "react";
import "./feedback.css";
import { getDatabase, ref, get, update, remove } from "firebase/database";
import QuoteRequests from "./quoteTable";

const Feedback = () => {
  const [unseenContactRequests, setUnseenContactRequests] = useState([]);
  const [seenContactRequests, setSeenContactRequests] = useState([]);

  useEffect(() => {
    const fetchContactRequests = async () => {
      const database = getDatabase();
      const contactRequestsRef = ref(database, "requests/contactRequests");

      try {
        const contactSnapshot = await get(contactRequestsRef);
        const contactData = contactSnapshot.val();

        if (contactData) {
          const requestsArray = Object.values(contactData);
          const unseenRequests = requestsArray.filter(
            (request) => request.state === "unseen"
          );
          const seenRequests = requestsArray.filter(
            (request) => request.state === "seen"
          );

          setUnseenContactRequests(unseenRequests);
          setSeenContactRequests(seenRequests);
        }
      } catch (error) {
        console.error("Error fetching contact requests:", error);
      }
    };

    fetchContactRequests();
  }, []);

  const markContactAsSeen = async (requestId) => {
    const database = getDatabase();
    const contactRequestsRef = ref(
      database,
      `requests/contactRequests/${requestId}`
    );

    try {
      await update(contactRequestsRef, {
        state: "seen",
      });

      // Fetch updated requests
      const contactSnapshot = await get(
        ref(database, "requests/contactRequests")
      );
      const contactData = contactSnapshot.val();

      if (contactData) {
        const requestsArray = Object.values(contactData);
        const unseenRequests = requestsArray.filter(
          (request) => request.state === "unseen"
        );
        const seenRequests = requestsArray.filter(
          (request) => request.state === "seen"
        );

        setUnseenContactRequests(unseenRequests);
        setSeenContactRequests(seenRequests);
      }
    } catch (error) {
      console.error("Error marking message as seen:", error);
    }
  };

  const deleteMessage = async (requestId) => {
    const database = getDatabase();
    const contactRequestsRef = ref(
      database,
      `requests/contactRequests/${requestId}`
    );

    try {
      await remove(contactRequestsRef);

      // Fetch updated requests
      const contactSnapshot = await get(
        ref(database, "requests/contactRequests")
      );
      const contactData = contactSnapshot.val();

      if (contactData) {
        const requestsArray = Object.values(contactData);
        const unseenRequests = requestsArray.filter(
          (request) => request.state === "unseen"
        );
        const seenRequests = requestsArray.filter(
          (request) => request.state === "seen"
        );

        setUnseenContactRequests(unseenRequests);
        setSeenContactRequests(seenRequests);
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <div className="feedback-container">
      <div className="feedback-header">
        <span className="feedback-text">Demandes de contact</span>
      </div>
      <div className="feedback-section">
        <div className="feedback-section-header">
          <span className="feedback-section-title">Messages non lus</span>
        </div>
        <div className="contact-requests">
          <table className="contact-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Message</th>
                <th>Date et heure</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {unseenContactRequests.map((request) => (
                <tr key={request.requestid}>
                  <td>{request.name}</td>
                  <td>
                    <a href={`mailto:${request.email}`}>{request.email}</a>
                  </td>
                  <td>
                    <a href={`tel:${request.phone}`}>{request.phone}</a>
                  </td>

                  <td>{request.body}</td>
                  <td>{new Date(request.dateTime).toLocaleString("fr-FR")}</td>

                  <td>
                    <button
                      className="action-btn"
                      onClick={() => markContactAsSeen(request.requestid)}
                    >
                      Marquer comme lu
                    </button>
                    <button
                      className="action-btn"
                      onClick={() => deleteMessage(request.requestid)}
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
          <span className="feedback-section-title">Messages déjà lus</span>
        </div>
        <div className="contact-requests">
          <table className="contact-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Message</th>
                <th>Date et heure</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {seenContactRequests.map((request) => (
                <tr key={request.requestid}>
                  <td>{request.name}</td>
                  <td>
                    <a href={`mailto:${request.email}`}>{request.email}</a>
                  </td>
                  <td>
                    <a href={`tel:${request.phone}`}>{request.phone}</a>
                  </td>

                  <td>{request.body}</td>
                  <td>{new Date(request.dateTime).toLocaleString("fr-FR")}</td>

                  <td>
                    <button
                      className="action-btn"
                      onClick={() => deleteMessage(request.requestid)}
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
      <div className="feedback-header">
        <span className="feedback-text">Demandes de devis</span>
        <QuoteRequests></QuoteRequests>
      </div>
    </div>
  );
};

export default Feedback;
