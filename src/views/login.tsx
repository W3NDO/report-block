import React from "react";
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
          <a href="https://near.org" target="_blank" className="link-primary">
            NEAR Protocol
          </a>
          .
        </p>

        <div className="flex flex-col">
          {[
            ["Bureau", "business", "bureau"],
            ["Lender", "account_balance", "lender"],
            ["Consumer", "person", "consumer"],
          ].map(([title, icon, path]) => (
            <Link className="mb-3" tabIndex={-1} to={path}>
              <button className="w-full btn-primary">
                <span className="mr-2 material-icons">{icon}</span>
                <span>
                  Log in as <strong className="font-bold">{title}</strong>
                </span>
              </button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
