import React, { useContext } from "react";
import styles from "./FavouriteFactoryItem.module.css";

import useHttp from "../../hooks/use-http";
import { removeDataFromFavs } from "../../lib/api";
import AuthContext from "../../hooks/auth-context";

const FavouriteFactoryItem = (props) => {
  const authCtx = useContext(AuthContext);
  const userName = authCtx.email?.replace("@", "_").split(".").join("");
  const { sendRequest, error } = useHttp(removeDataFromFavs);

  const removeFavHandler = () => {
    sendRequest({ username: userName, category: "factory", id: props.DOTCode });
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
        <div className={styles.factoryInfo}>
          <div>Name: {props.Name}</div>
          <div>Country: {props.Country}</div>
          <div>City: {props.City}</div>
          <div>
            Address: {props.Address ? `${props.Address}` : "Address not found"}
          </div>
          <div>
            Postal Code:{" "}
            {props.PostalCode ? `${props.PostalCode}` : "Postal Code not found"}
          </div>
          <div>DOT Code: {props.DOTCode}</div>
          <div>Factory status: {props.Status}</div>
        </div>
        <button className={styles.removeButton} onClick={removeFavHandler}>
          Remove from Favs
        </button>
      </div>
    </>
  );
};
export default FavouriteFactoryItem;
