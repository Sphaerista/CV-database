/* eslint-disable */
import React, { useState, useEffect, useContext } from "react";
import Modal from "../Modal/Modal";
import styles from "./ViewFactory.module.css";
import useHttp from "./../../hooks/use-http";
import { addToFavs, getDataInFavs } from "../../lib/api";
import AuthContext from "../../hooks/auth-context";

const ViewFactory = (props) => {
  const [isAddedToFavs, setIsAddedToFavs] = useState(false);
  const [alreadyExistsInFavs, setAlreadyExistsInFavs] = useState(false);
  const { sendRequest } = useHttp(addToFavs);
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const userName = authCtx.email?.replace("@", "_").split(".").join("");

  ///// get-keys-to-check-if-it-is-already-added /////
  const {
    sendRequest: getKeys,
    status: getStatus,
    error: getError,
    data: loadedFavs,
  } = useHttp(getDataInFavs, true);

  useEffect(() => {
    if (props.dataViewFactory) {
      getKeys({ username: userName, category: "factory" });
      console.log("sent", getStatus);
    }
  }, [getKeys]);

  let getDOTCodes = [];
  if (getStatus === "pending") {
    console.log("pending");
  }
  if (getError) {
    return <div className="centered focused">{getError}</div>;
  }
  if (getStatus === "completed" && loadedFavs) {
    getDOTCodes = Object.keys(loadedFavs);
  }

  if (getStatus === "completed" && !loadedFavs) {
    getDOTCodes = "no data here";
  }
  if (
    getDOTCodes.includes(props.dataViewFactory.DOTCode) &&
    !alreadyExistsInFavs
  ) {
    setIsAddedToFavs(true);
    setAlreadyExistsInFavs(true);
  }
  ///// END-get-keys-to-check-if-it-is-already-added /////

  const HandleCloseModal = () => {
    props.onCloseModal();
  };
  const addToFavsHandler = () => {
    console.log(props.dataViewFactory);
    sendRequest({
      savedData: props.dataViewFactory,
      id: props.dataViewFactory.DOTCode,
      category: "factory",
      username: userName,
    });
    setIsAddedToFavs(true);
  };
  return (
    <Modal>
      {" "}
      <div className={styles.modalWindow}>
        {isLoggedIn ? (
          <div className="add-to-favs-btn">
            {!isAddedToFavs && (
              <button onClick={addToFavsHandler}>Add to favs</button>
            )}
            {isAddedToFavs && (
              <div className={styles.alreadyAdded}>Already Added</div>
            )}
          </div>
        ) : (
          <div className="add-to-favs-pending">Login to add to favs</div>
        )}

        <div className={styles.factoryInfo}>
          <div>Name: {props.dataViewFactory.Name}</div>
          <div>Country: {props.dataViewFactory.Country}</div>
          <div>City: {props.dataViewFactory.City}</div>
          <div>Address: {props.dataViewFactory.Address}</div>
          <div>Postal Code: {props.dataViewFactory.PostalCode}</div>
          <div>DOT Code: {props.dataViewFactory.DOTCode}</div>
          <div>Factory status: {props.dataViewFactory.Status}</div>
        </div>
        <div className={styles["close-factory-btn"]}>
          <button onClick={HandleCloseModal}>Close</button>
        </div>
      </div>
    </Modal>
  );
};
export default ViewFactory;
