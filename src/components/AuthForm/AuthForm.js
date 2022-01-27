import styles from "./AuthForm.module.css";

import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../hooks/auth-context";

const KEY = "AIzaSyBD0UsyZbiRxlHEqwyVHf3RlQ04C5tgZS8";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const switcherHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const emailHandler = (e) => {
    e.preventDefault();
    setEmailInput(e.target.value);
  };
  const passwordHandler = (e) => {
    e.preventDefault();
    setPasswordInput(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInput;
    const enteredPassword = passwordInput;
    ////////////// fetch to firebase ///////////////
    let url;
    if (isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${KEY}`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${KEY}`;
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Auth failed";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.idToken, data.email);
        history.push("/home");
        console.log(data);
      })
      .catch((error) => {
        alert(error.message);
      });
    setEmailInput("");
    setPasswordInput("");
  };
  return (
    <section className={styles.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={styles.control}>
          <label htmlFor="email">Email</label>
          <input
            onChange={emailHandler}
            type="email"
            id="email"
            value={emailInput}
            required
            autoFocus
          />
        </div>
        <div className={styles.control}>
          <label htmlFor="password">Password</label>
          <input
            onChange={passwordHandler}
            type="password"
            id="password"
            value={passwordInput}
            required
          />
        </div>
        <div className={styles.actions}>
          <button>{isLogin ? "Login" : "Create account"}</button>
          <button
            className={styles.toggle}
            type="button"
            onClick={switcherHandler}
          >
            {isLogin ? "Create new account" : "Login with account"}
          </button>
        </div>
      </form>
    </section>
  );
};
export default AuthForm;
