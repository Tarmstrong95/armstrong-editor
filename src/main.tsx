import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import SharedStateContextProvider from "./Contexts/SharedStateContext";
import "./style.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SharedStateContextProvider>
      <App />
    </SharedStateContextProvider>
  </React.StrictMode>
);
