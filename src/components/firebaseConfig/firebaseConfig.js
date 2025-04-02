import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from "firebase/database";  // Import Realtime Database
import { getStorage } from "firebase/storage";    // Import Firebase Storage
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Use environment variables for Firebase config
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY, //AIzaSyB_TvKJ01UrOqvwh2xccjY1HPW2NJub8ME
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN, //url-shortener-79320.firebaseapp.com
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,   //https://url-shortener-79320-default-rtdb.asia-southeast1.firebasedatabase.app
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,   //url-shortener-79320
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,   //url-shortener-79320.firebasestorage.app
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,  //1020042458697
    appId: process.env.REACT_APP_FIREBASE_APP_ID,   //1:1020042458697:web:81d1455d35b65c42083198
    //measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getDatabase(app);  // Initialize Realtime Database
const storage = getStorage(app);  // Initialize Firebase Storage
const firestore = getFirestore(app); // Initialize Firestore
export {ref} from 'firebase/database'
export { db };  // Export for use in other parts of your app
