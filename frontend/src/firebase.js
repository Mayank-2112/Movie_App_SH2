// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { configDotenv } from "dotenv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "movieappsh2-7136f.firebaseapp.com",
  projectId: "movieappsh2-7136f",
  storageBucket: "movieappsh2-7136f.appspot.com",
  messagingSenderId: "54656393938",
  appId: "1:54656393938:web:8c4ea84e827241a6fec30b",
  measurementId: "G-VFGN6YNC83"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export {app};