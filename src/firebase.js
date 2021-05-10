import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAWrl2TwSnjK17NDrL-e_HitRSgWlonpfY",
  authDomain: "snapchat-web-clone.firebaseapp.com",
  projectId: "snapchat-web-clone",
  storageBucket: "snapchat-web-clone.appspot.com",
  messagingSenderId: "326315222871",
  appId: "1:326315222871:web:343af628fef0eb6d724012",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();

const storage = firebase.storage();

const auth = firebase.auth();

const db = firebaseApp.firestore();

export { provider, storage, auth, db };
