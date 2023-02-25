import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
//compo
//react router!!!!
import { BrowserRouter } from "react-router-dom";
//mui
import { GeistProvider, CssBaseline } from "@geist-ui/core";
//redux
import { Provider } from "react-redux";
import store from "./redux/store";
//firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const { 
  FIREBASE_APIKEY, 
  FIREBASE_AUTH_DOMAIN, 
  FIREBASE_PROJECT_ID, 
  FIREBASE_STORAGE_BUCKET, 
  FIREBASE_MESSAGING_SENDER_ID, 
  FIREBASE_APP_ID, 
  FIREBASE_MEASUREMENT_ID
 } = process.env

const firebaseConfig = {
  apiKey: "AIzaSyCu4buN2Go_VtQpl57-mFU1NVl_eAFzWAY",
  authDomain: `${FIREBASE_AUTH_DOMAIN}`,
  projectId: `${FIREBASE_PROJECT_ID}`,
  storageBucket: `${FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${FIREBASE_APP_ID}`,
  measurementId: `${FIREBASE_MEASUREMENT_ID}`
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <GeistProvider>
            <CssBaseline />
            <App />
          </GeistProvider>
        </BrowserRouter>
      </Provider>
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
