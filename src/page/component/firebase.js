import firebase from "firebase/app";
import 'firebase/database'
// import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC2P-ZDsyBysZKLfWahI-UmCWDOcDd1T0I",
    authDomain: "wiki-city-dee92.firebaseapp.com",
    databaseURL: "https://wiki-city-dee92.firebaseio.com",
    projectId: "wiki-city-dee92",
    storageBucket: "wiki-city-dee92.appspot.com",
    messagingSenderId: "41984408323",
    appId: "1:41984408323:web:8da287276e9bc876c98736"
  };

const app = firebase.initializeApp(firebaseConfig);
export const db = app.database()
