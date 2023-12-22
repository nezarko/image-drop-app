import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Demo from "./Demo";
// Globa primtive class injecction : Future feauute , create Dependicy ijection and factory pattren. 
String.prototype.wordCount = function () {
  return (this.length && this.split(/\s+\b/).length) || 0;
};



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
