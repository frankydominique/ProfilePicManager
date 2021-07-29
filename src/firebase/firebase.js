import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDTBg52bHVhLhNg729G1y84AgPbtxJcHYk",
    authDomain: "pfp-manager.firebaseapp.com",
    projectId: "pfp-manager",
    storageBucket: "pfp-manager.appspot.com",
    messagingSenderId: "534901270338",
    appId: "1:534901270338:web:438c394dc883a68e2c0adb",
    measurementId: "G-9SYBV2JP8P"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;