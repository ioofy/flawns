import styled, { createGlobalStyle } from "styled-components";
import { colors, maxWidth } from "./variables.styles";

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: "AllianceEB";
    src: url("/font/AllianceEB.ttf") format("truetype");
  }

  @font-face {
    font-family: "AllianceM";
    src: url("/font/AllianceM.ttf") format("truetype");
  }

  @font-face {
    font-family: "Guillon";
    src: url("/font/Guillon.otf") format("opentype");
  }

  @font-face {
    font-family: "GuillonB";
    src: url("/font/GuillonB.otf") format("opentype");
  }

  * {
    padding: 0px;
    margin: 0px;
    box-sizing: border-box;
  }

  body{
    background: ${colors.sweetGray};
  }

`;

export const Container = styled.div`
  z-index: 1;
  width: 100%;
  max-width: ${maxWidth.large};
  margin: 0px auto;
  padding: 15px;

  .toaster {
    font-family: "AllianceEB", sans-serif;
    font-size: 15px;
  }

  @media screen and (max-width: 991px) {
    padding: 0px;
  }
`;
