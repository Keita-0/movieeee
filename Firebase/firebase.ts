// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWHJzQwiNK3N_jHUZURUWHA9W9z0nKuZc",
  authDomain: "movie-59b39.firebaseapp.com",
  projectId: "movie-59b39",
  storageBucket: "movie-59b39.appspot.com",
  messagingSenderId: "24816755143",
  appId: "1:24816755143:web:53966fe16972a9a0ec39e2",
  measurementId: "G-Y48B49TKX2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore();

export default { app, analytics };
