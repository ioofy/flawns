import { colors } from "@styles/variables.styles";
import styled from "styled-components";

type ArtBoardComponentsProps = {
  imgStart?: boolean;
  start?: string;
};

export const WrapperSection = styled.div`
  margin: 190px 0;

  @media screen and (max-width: 991px) {
    margin: 100px 0;
  }
`;

export const WrapperRow = styled.div<ArtBoardComponentsProps>`
  display: flex;
  margin: 0 -15px -15px -15px;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: ${({ imgStart }) => (imgStart ? "row-reverse" : "row")};

  @media screen and (max-width: 991px) {
    margin: 0px;
  }
`;

export const WrapperColumn = styled.div`
  flex: 1;
  max-width: 50%;
  flex-basis: 50%;

  @media screen and (max-width: 912px) {
    max-width: 100%;
    flex-basis: 100%;
    display: flex;
    justify-content: center;
  }
`;

export const TextWrapper = styled.div`
  max-width: 590px;
  position: relative;
  margin-left: -10px;
  padding: 0px 0px 60px 10px;

  @media screen and (max-width: 1024px) {
    margin-left: -80px;
  }

  @media screen and (max-width: 884px) {
    padding: 0px 0px 60px 0px;
    margin-left: 10px;
    margin-right: 10px;
  }

  @media screen and (max-width: 428px) {
    max-width: 400px;
  }
`;

export const Heading = styled.h1`
  font-size: 55px;
  line-height: 1.1;
  font-family: "AllianceEB", sans-serif;
  color: ${colors.black};
  margin-bottom: 20px;

  @media screen and (max-width: 1024px) {
    font-size: 50px;
  }

  @media screen and (max-width: 428px) {
    font-size: 36px;
  }
`;

export const CustomWrapper = styled.div`
  max-width: 550px;
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 991px) {
    max-width: 100%;
    margin: auto;
    flex-direction: column;
  }
`;

export const Learn = styled.p`
  font-size: 15px;
  margin-top: 1px;
  font-family: "AllianceM", sans-serif;

  a {
    color: ${colors.pink};
  }

  @media screen and (max-width: 428px) {
    margin-top: 15px;
  }
`;

export const Subtitle = styled.p`
  max-width: 450px;
  font-size: 18px;
  margin-bottom: 20px;
  font-family: "AllianceM", sans-serif;
  line-height: 25px;

  @media screen and (max-width: 428px) {
    max-width: 320px;
    font-size: 17px;
    margin-left: 0px;
  }
`;

export const ImgWrapper = styled.div<ArtBoardComponentsProps>`
  max-width: 555px;
  display: flex;
  margin-top: -60px;
  margin-bottom: 25px;
  justify-content: ${({ start }) => (start ? "flex-start" : "flex-end")};
`;

export const ImgComponents = styled.img`
  border: 0;
  position: relative;
  margin-left: -140px;
  width: 125%;

  @media screen and (max-width: 991px) {
    max-width: 100%;
    margin: 0px;
  }
`;
