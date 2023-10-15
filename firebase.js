// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9a_xRyNWEOwc0rByyKNdDDzwvGUUnHNE",
  authDomain: "devlink-b907f.firebaseapp.com",
  projectId: "devlink-b907f",
  storageBucket: "devlink-b907f.appspot.com",
  messagingSenderId: "162568157103",
  appId: "1:162568157103:web:ca9f996b56fd5dd16b615a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);
export {auth, db}
