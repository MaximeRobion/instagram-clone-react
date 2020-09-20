import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBT8A6Ct67GULgIpK1YqscXgTmK-2BeKp8",
  authDomain: "instagram-clone-bb710.firebaseapp.com",
  databaseURL: "https://instagram-clone-bb710.firebaseio.com",
  projectId: "instagram-clone-bb710",
  storageBucket: "instagram-clone-bb710.appspot.com",
  messagingSenderId: "626533486108",
  appId: "1:626533486108:web:539a8bc1170afbbfe9d9d9",
  measurementId: "G-4MKME9EYHN"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

//export conf
export {db, auth, storage};
