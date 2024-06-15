import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBjJzPSFxr8MXGVjwiKapsifA7sxTnjcyk",
  authDomain: "urlshortner-ed4e3.firebaseapp.com",
  projectId: "urlshortner-ed4e3",
  storageBucket: "urlshortner-ed4e3.appspot.com",
  messagingSenderId: "46278456193",
  appId: "1:46278456193:web:4472b0ed2d6bab4ab0ee80",
  measurementId: "G-5N1XW3ZEBD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
