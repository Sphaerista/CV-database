import React from "react";
import styles from "./FavouriteFactoryList.module.css";
import FavouriteFactoryItem from "./FavouriteFactoryItem";

const FavouriteFactoryList = (props) => {
  const favs = props.favs;

  return (
    <>
      <ul className={styles.list}>
        {favs.map((item) => {
          return (
            <>
              <FavouriteFactoryItem
                key={item.DOTCode}
                id={item.DOTCode}
                Name={item.Name}
                Country={item.Country}
                City={item.City}
                Address={item.Address}
                PostalCode={item.PostalCode}
                DOTCode={item.DOTCode}
                Status={item.Status}
                onRefreshFavsHandler={props.onRefreshFavsHandler}
              />
            </>
          );
        })}
      </ul>
    </>
  );
};

export default FavouriteFactoryList;
