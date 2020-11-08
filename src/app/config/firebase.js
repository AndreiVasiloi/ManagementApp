import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "managementapp-d440e.firebaseapp.com",
    databaseURL: "https://managementapp-d440e.firebaseio.com",
    projectId: "managementapp-d440e",
    storageBucket: "managementapp-d440e.appspot.com",
    messagingSenderId: "741364281706",
    appId: "1:741364281706:web:fceb6044f39b8755d7b513"
}

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase; 