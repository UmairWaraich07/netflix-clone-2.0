import React, { useRef } from "react";
import "./SignUpScreen.css";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";

const SignUpScreen = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const dispatch = useDispatch();

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((userAuth) =>
        dispatch(
          login({
            id: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            email: userAuth.user.email,
          })
        )
      )
      .catch((error) => console.log(error.message));
  };

  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((userAuth) =>
        dispatch(
          login({
            id: userAuth.user.uid,
            displayName: userAuth.user.displayName,
            email: userAuth.user.email,
          })
        )
      )
      .catch((error) => alert(error.message));
  };

  return (
    <div className="signup">
      <form className="signup__form">
        <h2>Sign In</h2>
        <input ref={emailRef} type="email" placeholder="Email" />
        <input ref={passwordRef} type="password" placeholder="Password" />
        <button type="submit" onClick={signIn}>
          Sign In
        </button>
        <p className="signup__description">
          New to Netflix? <span onClick={register}>Sign Up now.</span>{" "}
        </p>
      </form>
    </div>
  );
};

export default SignUpScreen;
