import React, { useState } from "react";
import "./Login.css";
import SignUpScreen from "../SignUpScreen/SignUpScreen";

function Login() {
  const [login, setLogin] = useState(false);

  return (
    <div className="login">
      <div className="login__header">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
          alt="Netflix logo"
        />
        <button className="btn" onClick={() => setLogin(true)}>
          Sign In
        </button>
      </div>

      {login ? (
        <SignUpScreen />
      ) : (
        <div className="login__content">
          <h1>Unlimited films, TV programmes and more.</h1>
          <h4>Watch anywhere. Cancel at any time.</h4>
          <p>
            Ready to watch? Enter you email to create or restart your
            membership.
          </p>
          <div className="login__details">
            <form>
              <input
                className="login__input"
                type="text"
                placeholder="Email address"
              />
              <button
                type="submit"
                className="btn login__btn "
                onClick={() => setLogin(true)}
              >
                Get Started
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="login__fade" />
    </div>
  );
}

export default Login;
