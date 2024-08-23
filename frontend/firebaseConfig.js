// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChbQmkyRhs6GaYcBKJr3wzlWQiAC67iZE",
  authDomain: "dprocessing-9d736.firebaseapp.com",
  projectId: "dprocessing-9d736",
  storageBucket: "dprocessing-9d736.appspot.com",
  messagingSenderId: "920984170900",
  appId: "1:920984170900:web:1fbe9e858b2576a9e51f81",
  measurementId: "G-3S8JVBR7B7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);