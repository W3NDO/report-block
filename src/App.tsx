import "regenerator-runtime/runtime";
import React from "react";
import { Outlet } from "react-router";
import "./main.pcss";

import Header from "./components/header";

export default function App() {
  return (
    <>
      <img
        src="https://picsum.photos/id/983/1920/1080"
        aria-hidden
        className="fixed z-0 object-cover w-screen h-screen"
      />
      <div className="relative h-screen text-white bg-black bg-opacity-80">
        <Header />
        <Outlet />
      </div>
    </>
  );
}

// Bureau Dashboard:
// has links to run different actions
// has a record of most recent actions

// Lender Dashboard:
// has links to run different actions
// has a record of most recent actions

// User Dashboard:
// Shows credit score
// Shows link to view credit report
