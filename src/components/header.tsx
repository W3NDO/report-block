import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ApiContext } from "../services/api.service";

export default function Header() {
  const navigate = useNavigate();
  const api = React.useContext(ApiContext);
  const logout = () => {
    api.logout();
    navigate("/login");
  };

  return (
    <header className="relative z-50 flex items-center justify-between w-screen wrapper">
      <Link to="/" className="underline link-primary">
        <h1 className="text-2xl font-extrabold text-white">BlockReport</h1>
      </Link>

      {api.isLoggedIn && (
        <button onClick={() => logout()} className="link-primary">
          Log Out
        </button>
      )}
    </header>
  );
}
