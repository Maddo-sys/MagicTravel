// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDGnGS1k5J6wKOyvWdqTxW7b6va_61Aj5c",
  authDomain: "magictravel-db9e4.firebaseapp.com",
  projectId: "magictravel-db9e4",
  storageBucket: "magictravel-db9e4.appspot.com",
  messagingSenderId: "166969648456",
  appId: "1:166969648456:web:020206256c7b18aed4bf7d",
  measurementId: "G-KTZNFMHT18"
};

let app;

if(firebase.apps.length === 0 ){
 app = firebase.initializeApp(firebaseConfig);
}else{
 app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };