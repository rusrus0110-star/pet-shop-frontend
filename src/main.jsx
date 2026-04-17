import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/reset.css";

import App from "./app/App";
import { store } from "./app/providers/store/store";

import "./app/styles/reset.css";
import "./app/styles/variables.css";
import "./app/styles/globals.css";
import "./app/styles/antd-overrides.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
