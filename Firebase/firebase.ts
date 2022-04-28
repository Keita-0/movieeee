// Import the functions you need from the SDKs you need
import { FirebaseApp, getApps, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZ5SUiwd98uQM7CbtOaP2Xl2E2VLh3efI",
  authDomain: "movie-1eddc.firebaseapp.com",
  projectId: "movie-1eddc",
  storageBucket: "movie-1eddc.appspot.com",
  messagingSenderId: "36602615591",
  appId: "1:36602615591:web:077d7f5f5e9b149846bb02",
};

let app: FirebaseApp;
let db: Firestore;

if (typeof window !== "undefined" && !getApps().length) {
  app = initializeApp(firebaseConfig);
  db = getFirestore();
}

export { db };
