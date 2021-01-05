import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import QueuerContextProvider from "./contexts/QueuerContext";
import AuthContextProvider from "./contexts/AuthContext";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { SnackbarProvider } from "notistack";
import MessagingContextProvider from "./contexts/MessagingContext";

ReactDOM.render(
  <SnackbarProvider>
    <MessagingContextProvider>
      <AuthContextProvider>
        <QueuerContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueuerContextProvider>
      </AuthContextProvider>
    </MessagingContextProvider>
  </SnackbarProvider>,
  document.querySelector("#root")
);

serviceWorkerRegistration.register();
