import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import QueuerContextProvider from "./contexts/QueuerContext";
import EstablishmentContextProvider from "./contexts/EstablishmentContext";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

ReactDOM.render(
  <EstablishmentContextProvider>
    <QueuerContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueuerContextProvider>
  </EstablishmentContextProvider>,
  document.querySelector("#root")
);

serviceWorkerRegistration.register();
