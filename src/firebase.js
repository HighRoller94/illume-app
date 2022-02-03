import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD3DE1g4PT80g3q811r-ShLpUdqyVW41ew",
    authDomain: "illume-68c8e.firebaseapp.com",
    projectId: "illume-68c8e",
    storageBucket: "illume-68c8e.appspot.com",
    messagingSenderId: "230046518563",
    appId: "1:230046518563:web:e4a4a893b7dc0a1ebe5096"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };