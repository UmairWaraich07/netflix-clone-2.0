import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwR_JyChDO7UsRaSmDTt-Jo_ZUct4OKfI",
  authDomain: "netflix-2-build.firebaseapp.com",
  projectId: "netflix-2-build",
  storageBucket: "netflix-2-build.appspot.com",
  messagingSenderId: "303534326378",
  appId: "1:303534326378:web:d32a3ce3949782518f8013",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export const auth = firebase.auth();
export default db;
