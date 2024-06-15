import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";

const Redirect = () => {
  const { shortId } = useParams();

  useEffect(() => {
    const fetchUrl = async () => {
      const urlsCollection = collection(db, "urls");
      const q = query(
        urlsCollection,
        where("shortUrl", "==", `${window.location.origin}/${shortId}`)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const urlDoc = querySnapshot.docs[0];
        const urlData = urlDoc.data();
        const docRef = doc(db, "urls", urlDoc.id);

        // Check if the current session has already visited this URL
        const sessionKey = `visited_${shortId}`;

        // Increment visit count
        const newVisitCount = (urlData.visitCount || 0) + 1;
        await updateDoc(docRef, { visitCount: newVisitCount });

        // Store visit in localStorage
        localStorage.setItem(sessionKey, "true");

        // Redirect to the original URL
        window.location.href = urlData.originalUrl;
      } else {
        console.error("URL not found");
      }
    };

    fetchUrl();
  }, [shortId]);

  return <p style={{ textAlign: "center" }}>Redirecting...</p>;
};

export default Redirect;
