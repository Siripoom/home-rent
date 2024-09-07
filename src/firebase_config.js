// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPaFYLEZOhzW642ie4n9mm3Hao0SmBotc",
  authDomain: "pool-villa-aonang-home-9963b.firebaseapp.com",
  projectId: "pool-villa-aonang-home-9963b",
  storageBucket: "pool-villa-aonang-home-9963b.appspot.com",
  messagingSenderId: "16678406036",
  appId: "1:16678406036:web:eafa8950a2e9977c807181",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore and Storage
export const db = getFirestore(app);
export const storage = getStorage(app);
