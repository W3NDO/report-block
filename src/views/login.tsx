import React from "react";
import { AccountBalance, Apartment, Person } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <section className="absolute top-0 left-0 flex flex-col items-center justify-center w-screen h-screen">
      <div className="p-12 text-center rounded shadow-2xl bg-opacity-95 bg-neutral-900">
        <h2 className="mb-3 text-3xl font-bold">Login to Your Account</h2>
        <p className="mb-12 text-xl font-semibold text-neutral-400">
          Secure and transparent credit reporting,
          <br />
          powered by the{" "}
          <a
            href="https://near.org"
            target="_blank"
            className="link-primary"
          >
            NEAR Protocol
          </a>
          .
        </p>

        <div className="flex flex-col">
          {[
            ["Bureau", Apartment, "bureau"],
            ["Lender", AccountBalance, "lender"],
            ["Consumer", Person, "consumer"],
          ].map(([title, Icon, path]) => (
            <Link
              className="w-full mb-3 btn-primary"
              to={path}
            >
              <button tabIndex={-1}>
                <Icon className="mr-2" /> Log in as{" "}
                <strong className="font-bold">{title}</strong>
              </button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
