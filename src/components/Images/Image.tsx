import React from "react";
import styled from "styled-components";

const ImageWrapper = styled.div`
  max-width: 555px;
  margin: 20px auto;
`;

const ImageSuccesComponents = styled.img`
  width: 100px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 150px;

  @media screen and (max-width: 991px) {
    max-width: 100%;
  }
`;

export const SuccessImage = () => {
  return (
    <ImageWrapper>
      <ImageSuccesComponents src="/image/_verified.png" alt="success_avatar" />
    </ImageWrapper>
  );
};
