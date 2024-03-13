import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB6crWqjz86emfpyNEhg5fMHHdt_Kvr8Tw",
  authDomain: "csc-456-paw.firebaseapp.com",
  projectId: "csc-456-paw",
  storageBucket: "csc-456-paw.appspot.com",
  messagingSenderId: "1090834397966",
  appId: "1:1090834397966:web:c491a4134d49bcb074f55f",
  measurementId: "G-SVLTJC19SY",
};

const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const auth = getAuth(app);
