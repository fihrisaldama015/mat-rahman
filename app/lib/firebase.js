// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";

const provider = new GoogleAuthProvider();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCD4Qbw8bz5eYwDIPGfMX7hP9YM4S3MdY0",
  authDomain: "rahman-e9ef5.firebaseapp.com",
  projectId: "rahman-e9ef5",
  storageBucket: "rahman-e9ef5.appspot.com",
  messagingSenderId: "465461985196",
  appId: "1:465461985196:web:577cd595fb522f11494409",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export { db, provider, auth };
