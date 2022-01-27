import React, { useState, useEffect } from "react";
import useHttp from "../../hooks/use-http";
import { fetchFactoryForDatabase } from "../../lib/api";
import FactoryItem from "./FactoryItem";
import styles from "./FactorySearch.module.css";
import ViewFactory from "./ViewFactory";

const sortList = (items, descending, sortType) => {
  return items.sort((itemA, itemB) => {
    if (sortType) {
      if (descending) {
        return itemA.Name < itemB.Name ? 1 : -1;
      } else {
        return itemA.Name > itemB.Name ? 1 : -1;
      }
    } else {
      if (descending) {
        return itemA.City < itemB.City ? 1 : -1;
      } else {
        return itemA.City > itemB.City ? 1 : -1;
      }
    }
  });
};

const FactorySearch = () => {
  const [sortingAsc, setSortingAsc] = useState("asc");
  const [searchInput, setSearchInput] = useState("");
  const [activateSearch, setActivateSearch] = useState(false);
  const [getEquipmentType, setGetEquipmentType] = useState("");
  const [getReportType, setGetReportType] = useState("");
  const [getYear, setGetYear] = useState("");
  const [specificCountryList, setSpecificCountryList] = useState([]);
  const { sendRequest, status, data, error } = useHttp(fetchFactoryForDatabase);

  //////////////// first-selection //////////////////////
  const getEquipmentTypeHandler = (e) => {
    e.preventDefault();
    setGetEquipmentType(e.target.value);
  };
  const getReportTypeHandler = (e) => {
    e.preventDefault();
    setGetReportType(e.target.value);
  };
  const getYearHandler = (e) => {
    e.preventDefault();
    setGetYear(e.target.value);
  };

  const formSubmitted =
    getEquipmentType.length > 0 &&
    getReportType.length > 0 &&
    getYear.length > 0;

  const submitFactoryHandler = (e) => {
    e.preventDefault();
    sendRequest({
      equipmentType: getEquipmentType,
      reportType: getReportType,
      year: getYear,
    });
    setSpecificCountryList([]);
  };
  //////////////// END-first-selection //////////////////////

  //////////////// second-selection //////////////////////
  let showFactoryByCountry = [];
  const specificCountryHandler = (e) => {
    let selectedCountry = e.target.value;
    setActivateSearch(false);
    showFactoryByCountry = data.Results.filter((datacountry) => {
      if (datacountry.Country?.toLowerCase() === selectedCountry) {
        showFactoryByCountry.push(datacountry);
        setSpecificCountryList(showFactoryByCountry);
        setActivateSearch(true);
      }
      if (selectedCountry === "all") {
        setSpecificCountryList(data.Results);
        setActivateSearch(true);
      }
      return null;
    });
  };

  let mapCountries = data?.Results.map((data) => {
    return data.Country?.toLowerCase();
  });

  let uniqueCountriesList = [...new Set(mapCountries)];
  let sortuniqueCountriesList = uniqueCountriesList.sort((a, b) => {
    return a < b ? -1 : 1;
  });
  let optionMapList = sortuniqueCountriesList.map((country) => {
    return <option value={country}>{country}</option>;
  });

  // console.log(specificCountryList);
  //////////////// END-second-selection //////////////////////

  //////////////// sorting-selection //////////////////////
  const [isNameSort, setIsNameSort] = useState(true);
  const sortTypeHandler = (e) => {
    if (e.target.htmlFor === "name-sort") {
      setIsNameSort(true);
    }
    if (e.target.htmlFor === "city-sort") {
      setIsNameSort(false);
    }
  };

  const isSortingAscending = sortingAsc === "asc";
  const sortedList = sortList(
    specificCountryList,
    isSortingAscending,
    isNameSort
  );

  const changeAscDescHandler = (e) => {
    if (e.target.htmlFor === "asc-sort") {
      setSortingAsc("desc");
    }
    if (e.target.htmlFor === "desc-sort") {
      setSortingAsc("asc");
    }
  };
  //////////////// END-sorting-selection //////////////////////

  //////////////// factory-modal //////////////////////
  const [showViewFactory, setShowViewFactory] = useState(false);
  const [dataToViewFactory, setDataToViewFactory] = useState([]);
  const closeViewFactoryHandler = () => {
    setShowViewFactory(false);
  };
  const openViewFactoryHandler = () => {
    setShowViewFactory(true);
  };
  const dataViewFactoryHandler = (data) => {
    setDataToViewFactory(data);
  };
  //////////////// END-factory-modal //////////////////////

  ///////////// final-third ///////////////////
  let content = <p>No data</p>;
  useEffect(() => {}, [data, content, sendRequest]);
  if (error) {
    return <div className="centered focused">{error}</div>;
  }
  if (status === "completed" && data) {
    // setSpecificCountryList(data.Results);
    content = sortedList.map((data) => {
      return (
        <>
          <div className="focused">{data.Name}</div>
          <span>{data.Country} </span>
          <span>{data.City}</span>
        </>
      );
    });
  }
  if (specificCountryList.length > 0) {
    content = sortedList.map((data) => {
      return (
        <FactoryItem
          key={data.DOTCode}
          Name={data.Name}
          Country={data.Country}
          City={data.City}
          {...data}
          onOpenModal={openViewFactoryHandler}
          onViewFactory={dataViewFactoryHandler}
        />
      );
    });
  }
  ///////////// END-final-third ///////////////////

  //////////////// search //////////////////
  const searchHandler = (e) => {
    setTimeout(() => {
      setSearchInput(e.target.value);
    }, 400);
  };
  const filteredInput = sortedList.filter((country) => {
    return (
      country.Country.toLowerCase().includes(searchInput.toLowerCase()) ||
      country.City?.toLowerCase().includes(searchInput.toLowerCase()) ||
      country.Name.toLowerCase().includes(searchInput.toLowerCase())
    );
  });
  if (searchInput.length > 0) {
    content = filteredInput.map((data) => {
      return (
        <>
          <FactoryItem
            key={data.DOTCode}
            Name={data.Name}
            Country={data.Country}
            City={data.City}
            {...data}
            onOpenModal={openViewFactoryHandler}
            onViewFactory={dataViewFactoryHandler}
          />
        </>
      );
    });
  }
  console.log(filteredInput.length);
  //////////////// END-search //////////////////

  return (
    <>
      <div className="forForm">
        <form onSubmit={submitFactoryHandler}>
          <select
            onChange={getEquipmentTypeHandler}
            id="equipment"
            name="equipment"
          >
            <option value="">Select Equipment</option>
            <option value="1">Tires</option>
            <option value="3">Brake Hoses</option>
            <option value="13">Glazing</option>
            <option value="16">Retread</option>
          </select>
          <select onChange={getReportTypeHandler} id="cars" name="cars">
            <option value="">Select Report</option>
            <option value="new">New</option>
            <option value="updated">Updated</option>
            <option value="closed">Closed</option>
            <option value="all">All</option>
          </select>
          <select onChange={getYearHandler} id="years" name="years">
            <option value="">Select Year</option>
            <option value="2012">2012</option>
            <option value="2013">2013</option>
            <option value="2014">2014</option>
            <option value="2015">2015</option>
          </select>
          <button disabled={!formSubmitted}>Get a factory</button>
        </form>
      </div>
      <div className={styles.totalAmount}>
        {" "}
        {data && `Amount of factories type found: ${data.Count}`}
      </div>
      {data && (
        <div className={styles.options}>
          <div className={styles.countryListHandler}>
            <select
              onChange={specificCountryHandler}
              id="country"
              name="country"
            >
              <option value="">--Select country--</option>
              <option value="all">All countries</option>
              {optionMapList}
            </select>
          </div>
          <div className={styles.spare}>
            <div className={styles.sortbox}>
              <input type="radio" name="sort" id="city-sort" />
              <label
                onClick={sortTypeHandler}
                htmlFor="city-sort"
                className={styles["form-control"]}
              >
                Sort by City
              </label>
              <input type="radio" name="sort" id="name-sort" />
              <label
                onClick={sortTypeHandler}
                htmlFor="name-sort"
                className={styles["form-control"]}
              >
                Sort by Name
              </label>
            </div>
            <div className={styles.sortbox}>
              <input type="radio" name="sequence" id="asc-sort" />
              <label
                onClick={changeAscDescHandler}
                htmlFor="asc-sort"
                className={styles["form-control"]}
              >
                Ascending
              </label>
              <input type="radio" name="sequence" id="desc-sort" />
              <label
                onClick={changeAscDescHandler}
                htmlFor="desc-sort"
                className={styles["form-control"]}
              >
                Descending
              </label>
            </div>
          </div>
        </div>
      )}
      {data && (
        <div className={styles.searchInput}>
          <input
            type="search"
            onChange={searchHandler}
            placeholder="Search a country/city/factory..."
            maxLength="15"
            disabled={!activateSearch}
          />
          <div className={styles["factory-list"]}>{content}</div>
        </div>
      )}
      {showViewFactory && (
        <ViewFactory
          onCloseModal={closeViewFactoryHandler}
          dataViewFactory={dataToViewFactory}
        />
      )}
    </>
  );
};
export default FactorySearch;
