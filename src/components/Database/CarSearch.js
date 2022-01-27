import React from "react";
import styles from "./CarSearch.module.css";

import { useState, useEffect } from "react/cjs/react.development";
import useHttp from "./../../hooks/use-http";
import { fetchCarForDatabase, fetchCarListId } from "../../lib/api";
import CarItem from "./CarItem";

const CarSearch = () => {
  const [searchInput, setSearchInput] = useState("");
  const [getCar, setGetCar] = useState("");
  const [getYear, setGetYear] = useState("");
  const { sendRequest, status, data, error } = useHttp(fetchCarForDatabase);
  const {
    sendRequest: getCarListId,
    status: getStatus,
    data: getData,
    error: getError,
  } = useHttp(fetchCarListId);

  useEffect(() => {
    getCarListId();
  }, [getCarListId]);

  /////////////// bring-id-car-list////////////////

  if (getError) {
    return <div className="centered focused">{getError}</div>;
  }
  let carList = [];
  if (getStatus === "completed" && getData) {
    let matchingList = getData.Results.map((carId) => {
      const car = carId.MakeName;
      const id = carId.MakeId;
      const carItem = { id: id, car: car };
      carList.push(carItem);
      return null;
    });
    // console.log(getData);
  }
  let optionMapList = carList.map((model) => {
    return <option value={model.id}>{model.car}</option>;
  });

  let optionMapYear = [];
  for (let index = 2010; index < 2017; index++) {
    optionMapYear.push(<option value={index}>{index}</option>);
  }

  // console.log(optionMapList);
  // console.log(optionMapYear);
  /////////////// END-bring-id-car-list////////////////

  /////////////// model-and-year-selection////////////////
  const getCarHandler = (e) => {
    e.preventDefault();
    setGetCar(e.target.value);
  };
  const getYearHandler = (e) => {
    e.preventDefault();
    setGetYear(e.target.value);
  };
  const submitCarHandler = (e) => {
    e.preventDefault();
    // console.log(getCar, getYear);
    sendRequest({ manufacturer: getCar, year: getYear });
  };

  const formSubmitted = getCar.length > 0 && getYear.length > 0;
  // console.log(status, data, formSubmitted);
  /////////////// END-model-and-year-selection////////////////

  ///////////// final-third ///////////////////

  let content = <p>No data</p>;
  // useEffect(() => {}, [data, content, sendRequest]);
  if (error) {
    return <div className="centered focused">{error}</div>;
  }
  if (status === "completed" && data) {
    // setSpecificCountryList(data.Results);
    console.log(data.Results);
    content = data.Results.map((data) => {
      return (
        <>
          <CarItem key={data.Model_ID} {...data} />
        </>
      );
    });
  }
  ///////////// END-final-third ///////////////////

  //////////////// search //////////////////
  const searchHandler = (e) => {
    setTimeout(() => {
      setSearchInput(e.target.value);
    }, 200);
  };
  const filteredInput = data?.Results.filter((car) => {
    return car.Model_Name.toLowerCase().includes(searchInput.toLowerCase());
  });
  if (searchInput.length > 0) {
    content = filteredInput.map((data) => {
      return (
        <>
          <CarItem key={data.Model_ID} {...data} />
        </>
      );
    });
  }
  console.log(searchInput, filteredInput);
  //////////////// END-search //////////////////

  return (
    <>
      <div className="forForm">
        <form onSubmit={submitCarHandler}>
          <select onChange={getCarHandler} id="cars" name="cars">
            <option value="">Select Vehicle</option>
            {optionMapList}
          </select>
          <select onChange={getYearHandler} id="years" name="years">
            <option value="">Select Year</option>
            <option value="all">All Years</option>
            {optionMapYear}
          </select>
          <button disabled={!formSubmitted}>Get a car</button>
        </form>
      </div>
      <div className={styles.totalAmount}>
        {" "}
        {data && `Amount of vehicles found: ${data.Count}`}
      </div>
      {data && (
        <div className={styles.forList}>
          <input
            type="search"
            onChange={searchHandler}
            placeholder="Search the car model..."
            maxLength="15"
          />
          <div className={styles["car-list"]}>{content}</div>
        </div>
      )}
    </>
  );
};
export default CarSearch;
