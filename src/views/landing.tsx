import React from "react";
import { Link } from "react-router-dom";
import { ApiContext } from "../services/api.service";

export default function Landing() {
  const api = React.useContext(ApiContext);

  return (
    <>
      <section className="py-24 mt-8 wrapper">
        <article>
          <h2 className="mb-8 text-6xl font-bold leading-tight">
            Welcome to the future of
            <br />
            Credit Reporting.
          </h2>
          <p className="mb-8 text-2xl text-neutral-300">
            Secure and transparent reporting made possible by the{" "}
            <a href="https://near.org" target="_blank" className="link-primary">
              NEAR Protocol
            </a>
            .
          </p>

          <Link to={api.isLoggedIn ? api.userType : "login"} tabIndex={-1}>
            <button className="mr-4 text-xl btn-primary btn-cta">
              {api.isLoggedIn ? "Go to Dashboard" : "Get Started"}
            </button>
          </Link>
          <button className="px-6 text-xl btn-primary">Learn More</button>
        </article>
      </section>
    </>
  );
}
