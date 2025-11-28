import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7-UZKu2ot2vYAYouZdiW-xs4IE0y8g60",
  authDomain: "to-do-list-3a369.firebaseapp.com",
  databaseURL: "https://to-do-list-3a369-default-rtdb.firebaseio.com",
  projectId: "to-do-list-3a369",
  storageBucket: "to-do-list-3a369.firebasestorage.app",
  messagingSenderId: "956949879478",
  appId: "1:956949879478:web:27c654f6da4395a179a417"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
