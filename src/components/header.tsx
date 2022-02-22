import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="relative z-50 flex items-center justify-between w-screen p-8">
      <Link to="/" className="underline link-primary"><h1 className="text-xl font-extrabold text-white">BlockReport</h1></Link>
    </header>
  );
}
