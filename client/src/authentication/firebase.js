import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
/*   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID, */
  apiKey: "AIzaSyCu4buN2Go_VtQpl57-mFU1NVl_eAFzWAY",
  authDomain: "icare-d118d.firebaseapp.com",
  databaseURL: "https://icare-d118d-default-rtdb.firebaseio.com",
  projectId: "icare-d118d",
  storageBucket: "icare-d118d.appspot.com",
  messagingSenderId: "803208479245",
  appId: "1:803208479245:web:699aeea266fb1a5c364b44",
  measurementId: "G-MGW2GBYERH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
