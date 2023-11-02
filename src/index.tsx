import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from 'react-redux';
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import store from "./store/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
