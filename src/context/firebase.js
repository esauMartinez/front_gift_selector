// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/firestore'
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
    apiKey: "AIzaSyDl6rI1SGevKcBQ5gt0tthBph3o2vHEpp4",
    authDomain: "gift-selector-62d65.firebaseapp.com",
    projectId: "gift-selector-62d65",
    storageBucket: "gift-selector-62d65.appspot.com",
    messagingSenderId: "929365000505",
    appId: "1:929365000505:web:0fed2221dd2fc78c2128e8"
};

// Initialize Firebase
const app_firebase = initializeApp(firebaseConfig)
export const db = getFirestore(app_firebase)