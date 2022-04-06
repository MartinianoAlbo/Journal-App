// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyAtNWTRVPPo0felkKQqioVe3E0ZCcBLNjo",
  authDomain: "db-curso-react.firebaseapp.com",
  projectId: "db-curso-react",
  storageBucket: "db-curso-react.appspot.com",
  messagingSenderId: "395327171793",
  appId: "1:395327171793:web:ececf3586ad795824ba9f0",
  measurementId: "G-VB8S8K5W7V"
};

// Initialize Firebase
// firebase.initializeApp(firebaseConfig)
const app = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuth = new firebase.auth.GoogleAuthProvider();



export {
    app,
    db,
    googleAuth,
    firebase
}
