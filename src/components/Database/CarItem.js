import React, { useState, useContext } from "react";

import styles from "./CarItem.module.css";
import useHttp from "./../../hooks/use-http";
import { addToFavs } from "../../lib/api";
import AuthContext from "../../hooks/auth-context";

const CarItem = (props) => {
  const [isAddedToFavs, setIsAddedToFavs] = useState(false);
  const { sendRequest, status, error } = useHttp(addToFavs);
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const userName = authCtx.email?.replace("@", "_").split(".").join("");

  const addToFavsHandler = (e) => {
    e.preventDefault();
    sendRequest({
      savedData: props,
      id: props.Model_ID,
      category: "vehicle",
      username: userName,
    });
    setIsAddedToFavs(true);
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

      <div className={styles["car-model"]}>{props.Model_Name}</div>
      <div className={styles["car-info"]}>
        <span className={styles["car-name"]}>{props.Make_Name} </span>
      </div>
    </div>
  );
};
export default CarItem;
