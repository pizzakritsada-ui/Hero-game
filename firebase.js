// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";

// Firebase config ของคุณ
const firebaseConfig = {
  apiKey: "AIzaSyC4a9DrCeSN_HQFIHXWJhnzN4Jn376CdIc",
  authDomain: "hero-4ebbe.firebaseapp.com",
  databaseURL: "https://hero-4ebbe-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hero-4ebbe",
  storageBucket: "hero-4ebbe.firebasestorage.app",
  messagingSenderId: "868857385644",
  appId: "1:868857385644:web:d5366bee7f5d7b11e60509",
  measurementId: "G-2DE96HJN7Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export { db, ref, set, get };
