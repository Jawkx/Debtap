import firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBYvvokukiFXZOMMztUjelyt8z5Yk1hPTg",
  authDomain: "debtap-c176b.firebaseapp.com",
  projectId: "debtap-c176b",
  storageBucket: "debtap-c176b.appspot.com",
  messagingSenderId: "804709477570",
  appId: "1:804709477570:web:d92317c3f34a18dcf69f5b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase