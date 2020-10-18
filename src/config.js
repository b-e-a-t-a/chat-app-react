import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCjHvHMhBSV4yex_32x1f1qB1z_mz9TjWU",
  authDomain: "chat-react-app-5c9b8.firebaseapp.com",
  databaseURL: "https://chat-react-app-5c9b8.firebaseio.com",
  projectId: "chat-react-app-5c9b8",
  storageBucket: "chat-react-app-5c9b8.appspot.com",
  messagingSenderId: "468911053448",
  appId: "1:468911053448:web:c3cb8c978842644f8b1d3d",
  measurementId: "G-EN7ESYNGST"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.database();

export default db;