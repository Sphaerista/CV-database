import React from "react";
import styles from "./Checkbox.module.css";

const Checkbox = (props) => {
  return (
    <>
      <div className={styles.checkbox}>
        <input
          type="radio"
          name="radio"
          id="car-search"
          defaultChecked={props.whoIsChecked}
        />
        <label
          onClick={props.onSearchtypeHandler}
          htmlFor="car-search"
          className={styles["form-control"]}
        >
          {props.name1}
        </label>
        <input
          type="radio"
          name="radio"
          id="factory-search"
          defaultChecked={!props.whoIsChecked}
        />
        <label
          onClick={props.onSearchtypeHandler}
          htmlFor="factory-search"
          className={styles["form-control"]}
        >
          {props.name2}
        </label>
      </div>
    </>
  );
};
export default Checkbox;
