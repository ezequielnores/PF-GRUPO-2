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
//context para chat
import { AuthContextProvider } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <AuthContextProvider>
      <ChatContextProvider>
        <BrowserRouter>
          <GeistProvider>
            <CssBaseline />
            <App />
          </GeistProvider>
        </BrowserRouter>
      </ChatContextProvider>
    </AuthContextProvider>
  </Provider>
  // </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
