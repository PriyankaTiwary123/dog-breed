//@Child Component@//

import React from "react";
import styled from "styled-components";
import LoaderComponent from "../util/loader.js";
import { ErrorTemplate } from "../util/error-template.js";

const CardComponent = styled.div`
   {
    display: block;
    justify-content: center;
  }
`;

const DogListContainer = styled.div`
   {
    margin: 20px;
    background: white;
    display: inline-flex;
    border-radius: 0px 10px 0px 10px;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.5);
    @media (max-width: 766px) And (min-width: 300px) {
      width: 100%;
      margin: 20px 0px;
    }
  }
`;

const ImageTag = styled.img`
   {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 5px;
    width: 300px;
    max-height: 240px;
    @media (max-width: 766px) And (min-width: 300px) {
      width: 150px;
    }
  }
`;
const Name = styled.div`{
 color:#7FAAE4
 font-size: 18px;
 font-weight: bold;

  }`;
const BasicDetail = styled.div`
   {
    font-size: 16px;
  }
`;

const TitleContainer = styled.div`
   {
    line-height: 3;
    margin: 30px;
    float: right;
    width: 300px;
  }
`;

const DogList = (props) => {
  const { dogList, isLoader, isError } = props;

  return (
    <>
      {isError ? (
        <ErrorTemplate value="No Data!!" />
      ) : !isLoader ? (
        <CardComponent>
          {dogList &&
            dogList.map((dog, index) => {
              return (
                <DogListContainer key={index}>
                  <ImageTag src={dog.url}></ImageTag>
                  <TitleContainer>
                    <Name>{dog.name}</Name>
                    <BasicDetail>
                      <b>Breed Group:</b> {dog.breed_group}
                    </BasicDetail>
                    <BasicDetail>
                      <b>Height:</b> {dog.height.metric}
                    </BasicDetail>
                    <BasicDetail>
                      <b>Life Span:</b> {dog.life_span}
                    </BasicDetail>
                  </TitleContainer>
                </DogListContainer>
              );
            })}
        </CardComponent>
      ) : (
        <LoaderComponent />
      )}
    </>
  );
};

export default DogList;
