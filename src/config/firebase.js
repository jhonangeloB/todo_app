import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "todo-app-ab32e.firebaseapp.com",
  projectId: "todo-app-ab32e",
  storageBucket: "todo-app-ab32e.appspot.com",
  messagingSenderId: "1018903425272",
  appId: "1:1018903425272:web:aa28746a1e0a98f5a10b0d"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();