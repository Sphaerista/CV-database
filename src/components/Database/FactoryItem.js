import React, { useState, useContext } from "react";

import styles from "./FactoryItem.module.css";
import useHttp from "./../../hooks/use-http";
import { addToFavs } from "../../lib/api";
import AuthContext from "../../hooks/auth-context";

const FactoryItem = (props) => {
  const [isAddedToFavs, setIsAddedToFavs] = useState(false);
  const { sendRequest, status, error } = useHttp(addToFavs);
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const userName = authCtx.email?.replace("@", "_").split(".").join("");

  const addToFavsHandler = (e) => {
    e.preventDefault();
    sendRequest({
      savedData: props,
      id: props.DOTCode,
      category: "factory",
      username: userName,
    });
    setIsAddedToFavs(true);
  };
  const HandleOpenModal = () => {
    props.onOpenModal();
    const specificFactory = props;
    props.onViewFactory(specificFactory);
  };

  if (error) {
    return <div className="centered focused">{error}</div>;
  }
  const successedAdd = isAddedToFavs && status === "completed";
  const pendingAdd = isAddedToFavs && status === "pending";

  return (
    <div className="listItem">
      {isLoggedIn ? (
        <div className="add-to-favs-btn">
          {!isAddedToFavs && (
            <button onClick={addToFavsHandler}>Add to favs</button>
          )}
          {pendingAdd && <div className="add-to-favs-pending">Pending...</div>}
          {successedAdd && (
            <div className="add-to-favs-added">Successfully Added</div>
          )}
        </div>
      ) : (
        <div className="add-to-favs-pending">Login to add to favs</div>
      )}

      <div className={styles["factory-name"]}>{props.Name}</div>
      <div className={styles["factory-location"]}>
        <span className={styles["factory-country"]}>{props.Country} </span>
        <span className={styles["factory-city"]}>{props.City}</span>
      </div>
      <div className={styles["view-factory-btn"]}>
        <button onClick={HandleOpenModal}>View factory</button>
      </div>
    </div>
  );
};
export default FactoryItem;
