import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import RegisterProvider from "./context/registration";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RegisterProvider>
      <App />
    </RegisterProvider>
  </React.StrictMode>,
);
