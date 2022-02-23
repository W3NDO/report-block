import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";

import Login from "./views/login";
import Landing from "./views/landing";

const rootElement = document.querySelector("#root");
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route requiresLogin={true} path="bureau" element={<>Bureau</>} />
        <Route requiresLogin={true} path="lender" element={<>Lender</>} />
        <Route requiresLogin={true} path="consumer" element={<>Consumer</>} />
        <Route path="login" element={<Login />} />
        <Route path="" element={<Landing />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);
