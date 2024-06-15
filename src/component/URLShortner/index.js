import React, { useState } from "react";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { TailSpin } from "react-loader-spinner"; // Import the loader component

const URLShortener = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [visitCount, setVisitCount] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    const urlsCollection = collection(db, "urls");
    try {
      // Check if URL already exists
      const q = query(urlsCollection, where("originalUrl", "==", originalUrl));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // If the URL already exists, retrieve the existing short URL and visit count
        const existingUrl = querySnapshot.docs[0].data();
        setShortUrl(existingUrl.shortUrl);
        setVisitCount(existingUrl.visitCount || 0);
      } else {
        // Generate a short URL ID
        const shortId = Math.random().toString(36).substring(2, 8);
        const shortUrl = `${window.location.origin}/${shortId}`; // Use window.location.origin

        // Save to Firestore
        await addDoc(urlsCollection, { originalUrl, shortUrl, visitCount: 0 });

        setShortUrl(shortUrl);
        setVisitCount(0);
      }
    } catch (error) {
      console.error("Error shortening the URL:", error);
    }
    setLoading(false); // End loading
  };

  return (
    <div className="container">
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="Enter URL to shorten"
          required
        />
        <button type="submit" disabled={loading}>
          Shorten
        </button>
      </form>
      {loading ? (
        <div className="loader">
          <TailSpin type="ThreeDots" color="#007bff" height={80} width={80} />{" "}
          {/* Loader component */}
        </div>
      ) : (
        shortUrl && (
          <div className="short-url">
            <p>Shortened URL:</p>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
            <p className="visit-count">Visit Count: {visitCount}</p>
          </div>
        )
      )}
    </div>
  );
};

export default URLShortener;
