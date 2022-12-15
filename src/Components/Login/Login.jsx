import { auth, provider } from "../../firebase/firebase-config";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "../Login/Login.scss";
import logo from "../../img/googleIcon.png";

export default function Login({ setIsAuth }) {
  const [createEmail, setCreateEmail] = useState("");
  const [CreatePassword, setCreatePassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [toggleClass, setToggleClass] = useState(false);
  const [errorSignIn, setErrorSignIn] = useState("");
  const [errorSignUp, setErrorSignUp] = useState("");
  const navigate = useNavigate();

  const signWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signCreateAccount = async () => {
    await createUserWithEmailAndPassword(auth, createEmail, CreatePassword)
      .then(() => {
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
        navigate("/");
      })
      .catch((error) => {
        setErrorSignUp(error.message);
      });
  };

  const loginFunc = async () => {
    await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then(() => {
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
        navigate("/");
      })
      .catch((error) => {
        setErrorSignIn(error.message);
      });
  };

  return (
    <div className="loginForm">
      <div className="container loginForm__container">
        <div className={`cont ${toggleClass ? "s--signup" : ""}`}>
          <div className="form sign-in">
            <h2>Welcome back,</h2>
            <label>
              <span>Email</span>
              <input
                type="email"
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </label>
            <label>
              <span>Password</span>
              <input
                type="password"
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </label>
            {errorSignIn && <ErrorMessage errorMessage={errorSignIn} />}
            <button onClick={loginFunc} type="button" className="submit">
              Sign In
            </button>
            <button onClick={signWithGoogle} type="button" className="fb-btn">
              Connect with Google
              <img className="logoGoogle" src={logo} alt="Google" />
            </button>
          </div>
          <div className="sub-cont">
            <div className="img">
              <div className="img__text m--up">
                <h2>New here?</h2>
                <p>Sign up and discover great amount of new opportunities!</p>
              </div>
              <div className="img__text m--in">
                <h2>One of us?</h2>
                <p>
                  If you already has an account, just sign in. We've missed you!
                </p>
              </div>
              <div
                className="img__btn"
                onClick={() => setToggleClass((prev) => !prev)}
              >
                <span className="m--up">Sign Up</span>
                <span className="m--in">Sign In</span>
              </div>
            </div>
            {/* SIGN UP */}
            <div className="form sign-up">
              <h2>Time to feel like home,</h2>
              <label>
                <span>Email</span>
                <input
                  type="email"
                  onChange={(e) => setCreateEmail(e.target.value)}
                />
              </label>
              <label>
                <span>Password</span>
                <input
                  type="password"
                  onChange={(e) => setCreatePassword(e.target.value)}
                />
              </label>
              {errorSignUp && <ErrorMessage errorMessage={errorSignUp} />}
              <button
                onClick={signCreateAccount}
                type="button"
                className="submit"
              >
                Sign Up
              </button>
              <button onClick={signWithGoogle} type="button" className="fb-btn">
                {" "}
                Sign up with google
                <img className="logoGoogle" src={logo} alt="Google" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
