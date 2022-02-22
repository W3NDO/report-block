import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";

import Login from "./views/login";

const rootElement = document.querySelector("#root");
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="bureau" element={<>Bureau</>} />
        <Route path="lender" element={<>Lender</>} />
        <Route path="consumer" element={<>Consumer</>} />
        <Route path="" element={<Login />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);
