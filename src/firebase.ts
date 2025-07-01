// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlmQontaeY67moo1I-Hkb-PYDv225TrDM",
  authDomain: "my-project-lingoapp.firebaseapp.com",
  projectId: "my-project-lingoapp",
  storageBucket: "my-project-lingoapp.firebasestorage.app",
  messagingSenderId: "877248683439",
  appId: "1:877248683439:web:8d62092da1ee79effd235a",
  measurementId: "G-M90JQDZ1NQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
