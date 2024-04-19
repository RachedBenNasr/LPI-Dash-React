import React, { useEffect, useState } from "react";
import "./feedback.css";
import { getDatabase, ref, get, update, remove } from "firebase/database";

const Feedback = () => {
  const [unseenContactRequests, setUnseenContactRequests] = useState([]);
  const [seenContactRequests, setSeenContactRequests] = useState([]);
  const [unseenQuoteRequests, setUnseenQuoteRequests] = useState([]);
  const [seenQuoteRequests, setSeenQuoteRequests] = useState([]);

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

    const fetchQuoteRequests = async () => {
      const database = getDatabase();
      const quoteRequestsRef = ref(database, "requests/quoteRequests");

      try {
        const quoteSnapshot = await get(quoteRequestsRef);
        const quoteData = quoteSnapshot.val();

        if (quoteData) {
          const requestsArray = Object.values(quoteData);
          const unseenRequests = requestsArray.filter(
            (request) => request.state === "unseen"
          );
          const seenRequests = requestsArray.filter(
            (request) => request.state === "seen"
          );

          setUnseenQuoteRequests(unseenRequests);
          setSeenQuoteRequests(seenRequests);
        }
      } catch (error) {
        console.error("Error fetching quote requests:", error);
      }
    };

    fetchQuoteRequests();
  }, []);

  const markContactAsSeen = async (requestId) => {
    await markAsSeen(
      requestId,
      "contactRequests",
      setUnseenContactRequests,
      setSeenContactRequests
    );
  };

  const markQuoteAsSeen = async (requestId) => {
    await markAsSeen(
      requestId,
      "quoteRequests",
      setUnseenQuoteRequests,
      setSeenQuoteRequests
    );
  };

  const markAsSeen = async (
    requestId,
    requestType,
    setUnseenRequests,
    setSeenRequests
  ) => {
    const database = getDatabase();
    const requestsRef = ref(database, `requests/${requestType}/${requestId}`);

    try {
      await update(requestsRef, {
        state: "seen",
      });

      // Fetch updated requests
      const snapshot = await get(ref(database, `requests/${requestType}`));
      const data = snapshot.val();

      if (data) {
        const requestsArray = Object.values(data);
        const unseenRequests = requestsArray.filter(
          (request) => request.state === "unseen"
        );
        const seenRequests = requestsArray.filter(
          (request) => request.state === "seen"
        );

        setUnseenRequests(unseenRequests);
        setSeenRequests(seenRequests);
      }
    } catch (error) {
      console.error("Error marking request as seen:", error);
    }
  };

  const deleteContactMessage = async (requestId) => {
    await deleteMessage(
      requestId,
      "contactRequests",
      setUnseenContactRequests,
      setSeenContactRequests
    );
  };

  const deleteQuoteRequest = async (requestId) => {
    await deleteMessage(
      requestId,
      "quoteRequests",
      setUnseenQuoteRequests,
      setSeenQuoteRequests
    );
  };

  const deleteMessage = async (
    requestId,
    requestType,
    setUnseenRequests,
    setSeenRequests
  ) => {
    const database = getDatabase();
    const requestsRef = ref(database, `requests/${requestType}/${requestId}`);

    try {
      await remove(requestsRef);

      // Fetch updated requests
      const snapshot = await get(ref(database, `requests/${requestType}`));
      const data = snapshot.val();

      if (data) {
        const requestsArray = Object.values(data);
        const unseenRequests = requestsArray.filter(
          (request) => request.state === "unseen"
        );
        const seenRequests = requestsArray.filter(
          (request) => request.state === "seen"
        );

        setUnseenRequests(unseenRequests);
        setSeenRequests(seenRequests);
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const fetchListingHeader = async (listingID, type) => {
    try {
      const database = getDatabase();
      const listingRef = ref(database, `listings/${type}/${listingID}/header`);
      const snapshot = await get(listingRef);
      const header = snapshot.val();

      return header;
    } catch (error) {
      console.error("Error fetching listing header:", error);
      return null;
    }
  };

  return (
    <div className="feedback-container">
      <div className="section">
        <div className="feedback-header">
          <span className="feedback-text">Demandes de Devis</span>
        </div>
        <div className="feedback-section">
          <div className="feedback-section-header">
            <span className="feedback-section-title">Messages non lus</span>
          </div>
          <div className="quote-requests">
            <table className="contact-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Annonce</th>
                  <th>Date et heure</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {unseenQuoteRequests.map((request) => (
                  <tr key={request.requestid}>
                    <td>
                      <a
                        href={`mailto:${request.email}?subject=demande%20de%20devis%20-%20Le%20Point%20Immobilier%20Tunisie&body=Bonjour%2C%0D%0A%0D%0ANous%20voulons%20vous%20remercier%20pour%20votre%20confiance%20et%20pour%20nous%20avoir%20contact%C3%A9s.%20Nous%20sommes%20heureux%20de%20vous%20fournir%20le%20devis%20pour%20la%20propri%C3%A9t%C3%A9%20que%20vous%20avez%20demand%C3%A9e.%20Le%20montant%20s%27%C3%A9l%C3%A8ve%20%C3%A0%20XXXXX%20TND.%0D%0A%0D%0AN%27h%C3%A9sitez%20pas%20%C3%A0%20nous%20contacter%20si%20vous%20avez%20des%20questions%20ou%20si%20vous%20avez%20besoin%20de%20plus%20amples%20informations.%20Nous%20sommes%20%C3%A0%20votre%20disposition.%0D%0A%0D%0ACordialement%2C%0D%0ALe%20Point%20Immobilier%20Tunisie.`}
                      >
                        {request.email}
                      </a>
                    </td>

                    <td>{request.header}</td>
                    <td>
                      {new Date(request.dateTime).toLocaleString("fr-FR")}
                    </td>
                    <td>
                      <button
                        className="action-btn"
                        onClick={() => markQuoteAsSeen(request.requestid)}
                      >
                        Marquer comme vu
                      </button>
                      <button
                        className="action-btn"
                        onClick={() => deleteQuoteRequest(request.requestid)}
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
          <div className="quote-requests">
            <table className="contact-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Annonce</th>
                  <th>Date et heure</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {seenQuoteRequests.map((request) => (
                  <tr key={request.requestid}>
                    <td>
                      <a
                        href={`mailto:${request.email}?subject=demande%20de%20devis%20-%20Le%20Point%20Immobilier%20Tunisie&body=Bonjour%2C%0D%0A%0D%0ANous%20voulons%20vous%20remercier%20pour%20votre%20confiance%20et%20pour%20nous%20avoir%20contact%C3%A9s.%20Nous%20sommes%20heureux%20de%20vous%20fournir%20le%20devis%20pour%20la%20propri%C3%A9t%C3%A9%20que%20vous%20avez%20demand%C3%A9e.%20Le%20montant%20s%27%C3%A9l%C3%A8ve%20%C3%A0%20XXXXX%20TND.%0D%0A%0D%0AN%27h%C3%A9sitez%20pas%20%C3%A0%20nous%20contacter%20si%20vous%20avez%20des%20questions%20ou%20si%20vous%20avez%20besoin%20de%20plus%20amples%20informations.%20Nous%20sommes%20%C3%A0%20votre%20disposition.%0D%0A%0D%0ACordialement%2C%0D%0ALe%20Point%20Immobilier%20Tunisie.`}
                      >
                        {request.email}
                      </a>
                    </td>
                    <td>{request.header}</td>
                    <td>
                      {new Date(request.dateTime).toLocaleString("fr-FR")}
                    </td>
                    <td>
                      <button
                        className="action-btn"
                        onClick={() => deleteQuoteRequest(request.requestid)}
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
      <div className="separator"></div>
      <div className="section">
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
                      <a
                        href={`mailto:${request.email}?subject=demande%20de%20devis%20-%20Le%20Point%20Immobilier%20Tunisie&body=Bonjour%2C%0D%0A%0D%0ANous%20voulons%20vous%20remercier%20pour%20votre%20confiance%20et%20pour%20nous%20avoir%20contact%C3%A9s.%20Nous%20sommes%20heureux%20de%20vous%20fournir%20le%20devis%20pour%20la%20propri%C3%A9t%C3%A9%20que%20vous%20avez%20demand%C3%A9e.%20Le%20montant%20s%27%C3%A9l%C3%A8ve%20%C3%A0%20XXXXX%20TND.%0D%0A%0D%0AN%27h%C3%A9sitez%20pas%20%C3%A0%20nous%20contacter%20si%20vous%20avez%20des%20questions%20ou%20si%20vous%20avez%20besoin%20de%20plus%20amples%20informations.%20Nous%20sommes%20%C3%A0%20votre%20disposition.%0D%0A%0D%0ACordialement%2C%0D%0ALe%20Point%20Immobilier%20Tunisie.`}
                      >
                        {request.email}
                      </a>
                    </td>
                    <td>
                      <a href={`tel:${request.phone}`}>{request.phone}</a>
                    </td>
                    <td>{request.body}</td>
                    <td>
                      {new Date(request.dateTime).toLocaleString("fr-FR")}
                    </td>
                    <td>
                      <button
                        className="action-btn"
                        onClick={() => markContactAsSeen(request.requestid)}
                      >
                        Marquer comme lu
                      </button>
                      <button
                        className="action-btn"
                        onClick={() => deleteContactMessage(request.requestid)}
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
                      <a
                        href={`mailto:${request.email}?subject=demande%20de%20devis%20-%20Le%20Point%20Immobilier%20Tunisie&body=Bonjour%2C%0D%0A%0D%0ANous%20voulons%20vous%20remercier%20pour%20votre%20confiance%20et%20pour%20nous%20avoir%20contact%C3%A9s.%20Nous%20sommes%20heureux%20de%20vous%20fournir%20le%20devis%20pour%20la%20propri%C3%A9t%C3%A9%20que%20vous%20avez%20demand%C3%A9e.%20Le%20montant%20s%27%C3%A9l%C3%A8ve%20%C3%A0%20XXXXX%20TND.%0D%0A%0D%0AN%27h%C3%A9sitez%20pas%20%C3%A0%20nous%20contacter%20si%20vous%20avez%20des%20questions%20ou%20si%20vous%20avez%20besoin%20de%20plus%20amples%20informations.%20Nous%20sommes%20%C3%A0%20votre%20disposition.%0D%0A%0D%0ACordialement%2C%0D%0ALe%20Point%20Immobilier%20Tunisie.`}
                      >
                        {request.email}
                      </a>
                    </td>
                    <td>
                      <a href={`tel:${request.phone}`}>{request.phone}</a>
                    </td>
                    <td>{request.body}</td>
                    <td>
                      {new Date(request.dateTime).toLocaleString("fr-FR")}
                    </td>
                    <td>
                      <button
                        className="action-btn"
                        onClick={() => deleteContactMessage(request.requestid)}
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
    </div>
  );
};

export default Feedback;
