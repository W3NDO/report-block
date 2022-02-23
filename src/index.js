import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";

import ApiService, { ApiContext, UserType } from "./services/api";
import Login from "./views/login";
import Landing from "./views/landing";

const api = new ApiService();
const rootElement = document.querySelector("#root");

api.initContract().then(() => {
  ReactDOM.render(
    <ApiContext.Provider value={api}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path={UserType.Bureau} element={<>Bureau</>} />
            <Route path={UserType.Lender} element={<>Lender</>} />
            <Route path={UserType.Consumer} element={<>Consumer</>} />
            <Route path="login" element={<Login />} />
            <Route path="" element={<Landing />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>,
    rootElement
  );
});
