import React from "react";
import ReactDOM from "react-dom/client";
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


const firebaseConfig = {
  apiKey: "AIzaSyCu4buN2Go_VtQpl57-mFU1NVl_eAFzWAY",
  authDomain: "icare-d118d.firebaseapp.com",
  projectId: "icare-d118d",
  storageBucket: "icare-d118d.appspot.com",
  messagingSenderId: "803208479245",
  appId: "1:803208479245:web:699aeea266fb1a5c364b44",
  measurementId: "G-MGW2GBYERH"
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
