// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Paste your config here
const firebaseConfig = {
  apiKey: "AIzaSyCjHo6G71wR4pTdi9ZT7zZ0KGmfAfcPSEE",
  authDomain: "sarahjamie-wedding-site.firebaseapp.com",
  projectId: "sarahjamie-wedding-site",
  storageBucket: "sarahjamie-wedding-site.firebasestorage.app",
  messagingSenderId: "773504488395",
  appId: "1:773504488395:web:2f30e75983b56a972e1c4e",
  measurementId: "G-W1KHP19BB6"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Expose Firestore (for photo metadata) and Storage (for image files)
export const db = getFirestore(app);
export const storage = getStorage(app);
//Authentication
export const auth = getAuth(app);
