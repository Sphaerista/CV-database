import React, { useContext } from "react";
import styles from "./FavouriteCarItem.module.css";

import useHttp from "../../hooks/use-http";
import { removeDataFromFavs } from "../../lib/api";
import AuthContext from "../../hooks/auth-context";

const FavouriteCarItem = (props) => {
  const authCtx = useContext(AuthContext);
  const userName = authCtx.email?.replace("@", "_").split(".").join("");
  const { sendRequest, error } = useHttp(removeDataFromFavs);

  const removeFavHandler = () => {
    sendRequest({ username: userName, category: "vehicle", id: props.id });
    setTimeout(() => {
      props.onRefreshFavsHandler();
    }, 750);
  };

  if (error) {
    return <div className="centered focused">{error}</div>;
  }
  return (
    <>
      <div className="listItem">
        <div className={styles.carInfo}>
          <div>Name: {props.Name}</div>
          <div>Model: {props.Model}</div>
          <div>Model ID: {props.id}</div>
        </div>
        <button className={styles.removeButton} onClick={removeFavHandler}>
          Remove from Favs
        </button>
      </div>
    </>
  );
};

export default FavouriteCarItem;
