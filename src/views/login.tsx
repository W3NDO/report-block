import React from "react";
import { useNavigate } from "react-router-dom";
import { ApiContext, UserType } from "../services/api.service";

export default function Login() {
  const api = React.useContext(ApiContext);
  const navigate = useNavigate();
  const login = (type: UserType) => api.login(type);

  React.useEffect(() => {
    if (api.isLoggedIn) {
      navigate(`/${api.userType}`);
    }
  })

  return (
    <section className="absolute top-0 left-0 flex flex-col items-center justify-center w-screen h-screen">
      <article className="p-12 text-center rounded shadow-2xl bg-opacity-95 bg-neutral-900">
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
            ["Bureau", "business", UserType.Bureau],
            ["Lender", "account_balance", UserType.Lender],
            ["Consumer", "person", UserType.Consumer],
          ].map(([title, icon, userType]) => (
            <button key={userType} onClick={() => login(userType as UserType)} className="w-full mb-3 btn-primary">
              <span className="mr-3 material-icons">{icon}</span>
              <span>
                Log in as <strong className="font-bold">{title}</strong>
              </span>
            </button>
          ))}
        </div>
      </article>
    </section>
  );
}
