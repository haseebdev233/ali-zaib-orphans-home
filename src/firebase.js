// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAi6OpIfUgdS0sy3JYMjPsY6_HiPAXOvdE",
  authDomain: "ali-zaib-orphans-home.firebaseapp.com",
  projectId: "ali-zaib-orphans-home",
  storageBucket: "ali-zaib-orphans-home.appspot.com",
  messagingSenderId: "772028744498",
  appId: "1:772028744498:web:735f3fcc29b737f76a8d2b",
  databaseURL: "https://ali-zaib-orphans-home-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const db = getDatabase(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
