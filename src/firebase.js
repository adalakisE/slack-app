import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/database"
import "firebase/storage"

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyCbjJAl1Y4sNjW6csLUZQxQC0tkEgDlvh4",
    authDomain: "react-slack-clone-ae111.firebaseapp.com",
    projectId: "react-slack-clone-ae111",
    storageBucket: "react-slack-clone-ae111.appspot.com",
    messagingSenderId: "651534518510",
    appId: "1:651534518510:web:1614d59f44a567174ccbff",
    measurementId: "G-FKPGKFPD85",
    databaseURL: "https://react-slack-clone-ae111-default-rtdb.europe-west1.firebasedatabase.app/",

  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // firebase.analytics();


export default firebase;