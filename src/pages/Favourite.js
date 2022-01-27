import React, { useEffect, useState } from "react";

import styles from "./Favourite.module.css";
import { getDataInFavs } from "../lib/api";
import useHttp from "./../hooks/use-http";
import FavouriteFactoryList from "../components/Favourite/FavouriteFactoryList";
import Checkbox from "../components/UI/Checkbox";
import FavouriteCarList from "../components/Favourite/FavouriteCarList";
import { useContext } from "react/cjs/react.development";
import AuthContext from "../hooks/auth-context";

const Favourite = () => {
  const authCtx = useContext(AuthContext);
  const userName = authCtx.email?.replace("@", "_").split(".").join("");
  const [searchInput, setSearchInput] = useState("");
  const [isCarFavs, setIsCarFavs] = useState(true);
  const [refreshFavsPage, setRefreshFavsPage] = useState(false);
  const refreshFavsHandler = () => {
    setRefreshFavsPage(() => !refreshFavsPage);
  };
  const {
    sendRequest,
    status,
    error,
    data: loadedFavs,
  } = useHttp(getDataInFavs, true);

  useEffect(() => {
    if (isCarFavs) {
      sendRequest({ username: userName, category: "vehicle" });
    } else {
      sendRequest({ username: userName, category: "factory" });
    }
  }, [sendRequest, refreshFavsPage, isCarFavs]);

  let secondItem = [];
  let firstIteration;

  if (status === "pending") {
    return <div className="centered">Loading data...</div>;
  }
  if (error) {
    return <div className="centered focused">{error}</div>;
  }
  let noDataContent;
  if ((status === "completed" && !loadedFavs) || loadedFavs.length === 0) {
    noDataContent = (
      <div className="centered focused">You have no favs yet.</div>
    );
  } else {
    firstIteration = Object.entries(loadedFavs);
    firstIteration.forEach((element) => {
      const test = Object.entries(element[1]);
      secondItem.push(test[0][1]);
    });
  }

  // console.log(Object.keys(loadedFavs));
  // console.log(firstIteration, secondItem[0][1]);

  ////////////// checkbox-handler ////////////
  const searchtypeHandler = (e) => {
    if (e.target.htmlFor === "car-search") {
      setIsCarFavs(true);
    }
    if (e.target.htmlFor === "factory-search") {
      setIsCarFavs(false);
    }
  };
  ////////////// END-checkbox-handler ////////////

  ////////////// search /////////////
  const searchHandler = (e) => {
    setTimeout(() => {
      setSearchInput(e.target.value);
    }, 200);
  };
  console.log(secondItem);
  let filteredInput;
  if (isCarFavs) {
    filteredInput = secondItem?.filter((car) => {
      return (
        car.Model_Name?.toLowerCase().includes(searchInput.toLowerCase()) ||
        car.Make_Name?.toLowerCase().includes(searchInput.toLowerCase())
      );
    });
  }
  if (!isCarFavs) {
    console.log(secondItem);
    filteredInput = secondItem?.filter((country) => {
      return (
        country.Country?.toLowerCase().includes(searchInput.toLowerCase()) ||
        country.City?.toLowerCase().includes(searchInput.toLowerCase()) ||
        country.Name?.toLowerCase().includes(searchInput.toLowerCase()) ||
        country.Status?.toLowerCase().includes(searchInput.toLowerCase())
      );
    });
  }

  console.log(secondItem, filteredInput);
  ////////////// END-search /////////////
  return (
    <>
      <div className={styles.forSearch}>
        <div className="forCheckbox">
          <Checkbox
            name1="Car Favs"
            name2="Factory Favs"
            onSearchtypeHandler={searchtypeHandler}
            whoIsChecked={isCarFavs}
          />
        </div>

        <input
          type="search"
          onChange={searchHandler}
          placeholder="Search your favs..."
          maxLength="15"
        />
        {noDataContent && noDataContent}
      </div>

      {isCarFavs && (
        <FavouriteCarList
          favs={filteredInput}
          onRefreshFavsHandler={refreshFavsHandler}
        />
      )}
      {!isCarFavs && (
        <FavouriteFactoryList
          favs={filteredInput}
          onRefreshFavsHandler={refreshFavsHandler}
        />
      )}
    </>
  );
};
export default Favourite;
