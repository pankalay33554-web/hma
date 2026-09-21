import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import OnlineApp from "./online/onlineapp";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <OnlineApp />
    </BrowserRouter>
  </React.StrictMode>,
);
