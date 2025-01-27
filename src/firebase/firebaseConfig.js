import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import Authentication
import { getAnalytics } from "firebase/analytics"; // Optional: For analytics

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBiOG5b273daERmUWlIU7PACO-s_I-KPRE",
  authDomain: "freedeveloperscamp.firebaseapp.com",
  projectId: "freedeveloperscamp",
  storageBucket: "freedeveloperscamp.appspot.com",
  messagingSenderId: "109085477960",
  appId: "1:109085477960:web:379e24c1031d63a04e5c7d",
  measurementId: "G-F1JRCME3BW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase Authentication
const analytics = getAnalytics(app); // Optional: Analytics

export { auth }; // Export `auth` for use in other files
