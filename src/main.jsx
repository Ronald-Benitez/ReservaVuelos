import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

localStorage.setItem("bd", "PostgreSQL");
localStorage.setItem("base", "http://localhost:3000/api/");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
