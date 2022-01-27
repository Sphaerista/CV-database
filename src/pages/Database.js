import React, { useState } from "react";

import styles from "./Database.module.css";
import CarSearch from "./../components/Database/CarSearch";
import FactorySearch from "./../components/Database/FactorySearch";
import Checkbox from "./../components/UI/Checkbox";

const Database = () => {
  const [isCarSearch, setIsCarSearch] = useState(true);

  const searchtypeHandler = (e) => {
    if (e.target.htmlFor === "car-search") {
      setIsCarSearch(true);
    }
    if (e.target.htmlFor === "factory-search") {
      setIsCarSearch(false);
    }
  };

  return (
    <>
      <div className="forCheckbox">
        <Checkbox
          name1="Car Search"
          name2="Factory Search"
          onSearchtypeHandler={searchtypeHandler}
          whoIsChecked={isCarSearch}
        />
      </div>
      <div className={styles.forSearch}>
        {isCarSearch && <CarSearch />}
        {!isCarSearch && <FactorySearch />}
      </div>
    </>
  );
};
export default Database;
