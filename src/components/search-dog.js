import React from "react";
import styled, { css } from "styled-components";
import { BASE_URL, headers, IMAGE_BASE_URL } from "../service";
import axios from "axios";
import DogList from "./dog-list";
import { debounceFunction, sortHeightData, sortLifeSpanData } from "../util/util-functions";


export const HeaderContainer = styled.div`
   {
    width: 96%;
    margin-top: 20px;
    display: inline-block;
    background: white;
    border-radius: 0px 10px 0px 10px;
    text-align: left;
    padding-left: 20px;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.5);

    @media (max-width: 1024px) And (min-width: 768px) {
      width: 86%;
    }
  }
`;

export const HeaderText = styled.div`
   {
    font-size: 18px;
    font-family: Helvetica Neue;
    color: #7faae4;
    font-weight: bold;
    ${(props) =>
      props.secondary &&
      css`
        color: #834db7;
      `}
  }
`;

export const SearchBar = styled.div`
   {
    position: relative;
    width: 100%;
    & > input {
      border-radius: 0px 10px 0px 10px;
      line-height: 2.5;
      width: 50%;
      margin-top: 20px;
      border: none;
      font-size: 16px;
      box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.5);
      @media (max-width: 766px) And (min-width: 300px) {
        width: 100%;
      }
    }
    & > i {
      bottom: 2px;
      right: 380px;
      height: 28px;
      position: absolute;
      font-size: 20px;
      color: cadetblue;
      @media (max-width: 1024px) And (min-width: 768px) {
        right: 200px;
      }
      @media (max-width: 766px) And (min-width: 300px) {
        right: 0px;
      }
    }
  }
`;

const SortOptions = styled.select`
   {
    height: 20px;
    margin: 20px;
    width: 20%;
    float: right;
  }
`;




const SearchDog = () => {
  const [dogList, setDogList] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [isLoader, setIsLoader] = React.useState(false);
  const [sortingField, setSortingField] = React.useState(null);
  const [isError, setIsError] = React.useState(false);

  const getDogList = (queryParam) => {
    setIsLoader(true);
    axios
      .get(`${BASE_URL}?q=${queryParam}`, { headers: headers })
      .then((res) => {
        let resData = res.data;
        if (Object.keys(resData).length === 0) {
          setIsError(true);
        }
        let arr = [];
        let promises = [];
        for (let i = 0; i < resData.length; i++) {
          promises.push(
            axios
              .get(`${IMAGE_BASE_URL}${resData[i].reference_image_id || ""}`, {
                headers: headers,
              })
              .then((res) => {
                let imageResData = res.data;
                arr.push({ ...resData[i], url: imageResData.url });
              })
          );
        }
        Promise.all(promises)
          .then(() => {
            return setDogList(arr);
          })
          .then(() => {
            setIsLoader(false);
          });
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      });
  };

  const debounceDropdown = React.useCallback(
    debounceFunction((searchedVal) => getDogList(searchedVal), 1000),
    []
  );

  const onChangeValue = (e) => {
    const searchedVal = e.target.value;
    setSearchValue(searchedVal);
    debounceDropdown(searchedVal);
    if (searchedVal === "") {
      setIsError(true);
    }
    else{
        setIsError(false)
    }
  };

  const sortByKey = React.useMemo(() => {
    switch (sortingField) {
      case "name":
        return (
          dogList &&
          dogList
            .slice()
            .sort((a, b) => a[sortingField].localeCompare(b[sortingField]))
        );
      case "life_span":
        return sortHeightData(dogList, sortingField)
      case "height":
        return sortHeightData(dogList,sortingField)
      default:
        return dogList;
    }
  }, [dogList, sortingField]);

  const changeValueOptions = (e) => {
    setSortingField(e.target.value);
  };

  return (
    <>
      <HeaderContainer data-testid="header-text">
        <HeaderText>Dog</HeaderText>
        <HeaderText secondary>Breeds</HeaderText>
      </HeaderContainer>
      <SearchBar>
        <input
          type="text"
          data-testid="filter-input"
          value={searchValue}
          placeholder="Search Breed..."
          onChange={(e) => onChangeValue(e)}
        />
        <SortOptions
          data-testid="select-sort-options"
          className="form-select"
          aria-label="Default select example"
          onChange={(e) => changeValueOptions(e)}
        >
          <option defaultValue="sort">Sort By:</option>
          <option value="name">Name</option>
          <option value="height">Height</option>
          <option value="life_span">Life Span</option>
        </SortOptions>
      </SearchBar>
      <DogList dogList={sortByKey} isLoader={isLoader} isError={isError} />
    </>
  );
};

export default SearchDog;
