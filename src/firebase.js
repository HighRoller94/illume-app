import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD3DE1g4PT80g3q811r-ShLpUdqyVW41ew",
    authDomain: "illume-68c8e.firebaseapp.com",
    projectId: "illume-68c8e",
    storageBucket: "illume-68c8e.appspot.com",
    messagingSenderId: "230046518563",
    appId: "1:230046518563:web:e4a4a893b7dc0a1ebe5096"
}

// Initialize the Firebase App

const app = initializeApp(firebaseConfig)

// Initialize firestore services

const db = getFirestore(app);
const auth = getAuth(app);

const storage = getStorage(app);


export { db, auth, storage };