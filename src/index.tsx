import React from "react";
import ReactDOM from "react-dom";
import "@ya.praktikum/react-developer-burger-ui-components";

import { App } from "./components/app/app";
import { ErrorBoundary } from "./components/error-boundary/error-boundary";

import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
