import React from "react";
import styled from "styled-components";
import { colors } from "@styles/variables.styles";

// only provide error page

type ErrorComponentProps = {
  margin: string;
};

type ErrorContentsProps = {
  content: string;
  imgUrl?: string;
  margin?: string;
};

const ErrorContent = styled.h1`
  font-family: "AllianceM", sans-serif;
  margin-left: 28px;
  font-size: 27px;
  color: ${colors.black};
  opacity: 0.8;
  text-align: center;

  @media screen and (max-width: 820px) {
    margin-left: 0px;
    font-size: 24px;
  }
`;

const ContentWrapper = styled.div<ErrorComponentProps>`
  max-width: 850px;
  margin: ${(props) => props.margin};
`;

const ImageWrapper = styled.div`
  max-width: 555px;
  margin: 20px auto;
`;

const ImageComponents = styled.img`
  border: 0;
  width: 125%;
  margin-left: -50px;

  @media screen and (max-width: 991px) {
    max-width: 100%;
    margin: 0px;
  }
`;

export const ContentError: React.FC<ErrorContentsProps> = (props) => {
  return (
    <ContentWrapper margin={props.margin}>
      <ImageWrapper>
        <ImageComponents src={props.imgUrl} alt="avatar" />
      </ImageWrapper>
      <ErrorContent>{props.content}</ErrorContent>
    </ContentWrapper>
  );
};
