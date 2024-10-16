// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA_UDWs_pDxH-GJvIAUf6O5oiWC-tVltTI",
  authDomain: "cartapp-765e9.firebaseapp.com",
  projectId: "cartapp-765e9",
  storageBucket: "cartapp-765e9.appspot.com",
  messagingSenderId: "818057384412",
  appId: "1:818057384412:web:573e2551104778f2e2bf19",
  measurementId: "G-TBRL6FGCDZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);