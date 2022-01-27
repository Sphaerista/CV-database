import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../hooks/auth-context";

const Home = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <>
      {!isLoggedIn && (
        <div className="description">
          <h3>
            This project is a simple simulation of database website. The main
            scope was to get the certain data from the database API depending on
            user's selected options. The responsiveness of the website was not
            taken into consideration.
          </h3>
          <div>
            <h4>These are the features that I was focused on:</h4>
            <ul>
              <li>
                Show data from database API depending on selected options.
              </li>
              <li>Filter the data.</li>
              <li>Sort the data.</li>
              <li>Search items.</li>
              <li>Add items to the favourites.</li>
              <li>Login / Sign in.</li>
              <li>
                Show different information and features depending on whether the
                user is logged in or not.
              </li>
            </ul>
          </div>{" "}
        </div>
      )}
      {isLoggedIn && (
        <div className="home-logged">
          <div>
            Make a search in{" "}
            <span className="go-to-profile">
              <NavLink to="/database">Database</NavLink>
            </span>{" "}
            section.
          </div>
          <div>
            Check list of your favs in{" "}
            <span className="go-to-profile">
              <NavLink to="/favourite">Favourite</NavLink>
            </span>{" "}
            section.
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
