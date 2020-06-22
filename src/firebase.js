import firebase from 'firebase/app';
import 'firebase/database'; // If using Firebase database
var firebaseConfig = {
    apiKey: "AIzaSyD7gPck6hO3n5yEfUSTWXdMD8_q1nFJhwE",
    authDomain: "rolling-store-rm.firebaseapp.com",
    databaseURL: "https://rolling-store-rm.firebaseio.com",
    projectId: "rolling-store-rm",
    storageBucket: "rolling-store-rm.appspot.com",
    messagingSenderId: "515548808959",
    appId: "1:515548808959:web:d4a46b0455388b9823eeca"
  };

  firebase.initializeApp(firebaseConfig);
  
  const firebaseApp = firebase;

  export { firebaseApp };