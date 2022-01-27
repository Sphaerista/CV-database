import React from "react";
import FavouriteCarItem from "./FavouriteCarItem";
import styles from "./FavouriteCarList.module.css";

const FavouriteCarList = (props) => {
  const favs = props.favs;
  console.log(favs);
  return (
    <>
      <ul className={styles.list}>
        {favs.map((item) => {
          return (
            <>
              <FavouriteCarItem
                key={item.Model_ID}
                id={item.Model_ID}
                Name={item.Make_Name}
                Model={item.Model_Name}
                onRefreshFavsHandler={props.onRefreshFavsHandler}
              />
            </>
          );
        })}
      </ul>
    </>
  );
};

export default FavouriteCarList;
