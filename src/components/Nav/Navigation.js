import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../hooks/auth-context";
import styles from "./Navigation.module.css";

const Navigation = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const userName = authCtx.email?.split("@")[0];

  const logoutHandler = () => {
    authCtx.logout();
  };
  return (
    <div>
      <header className={styles.header}>
        <nav>
          <ul>
            <li>
              <NavLink to="/home" activeClassName={styles.active}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/database" activeClassName={styles.active}>
                Database
              </NavLink>
            </li>
            <li>
              {isLoggedIn && (
                <NavLink to="/favourite" activeClassName={styles.active}>
                  Favourite
                </NavLink>
              )}
            </li>
          </ul>
        </nav>
        <div className={styles.right_div}>
          {!isLoggedIn && (
            <NavLink to="/auth" activeClassName={styles.active}>
              Login | Sign Up
            </NavLink>
          )}
          {isLoggedIn && (
            <span onClick={logoutHandler}>Logout from '{userName}'</span>
          )}
        </div>
      </header>
    </div>
  );
};
export default Navigation;
