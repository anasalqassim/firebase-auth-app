// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3YxYeqrH8eKJIEnZJ7a4E7AfaMu77nqM",
  authDomain: "sakura-corp-801fb.firebaseapp.com",
  projectId: "sakura-corp-801fb",
  storageBucket: "sakura-corp-801fb.appspot.com",
  messagingSenderId: "550324588698",
  appId: "1:550324588698:web:79302545236d6b49e7cf23",
  measurementId: "G-E9BMT00TE7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

