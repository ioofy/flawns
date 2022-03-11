import { colors } from "@styles/variables.styles";
import styled from "styled-components";

type ButtonProps = {
  background?: string;
  cursor?: boolean;
};

export const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  .toaster {
    font-family: "AllianceEB", sans-serif;
    font-size: 15px;
  }
`;

export const Container = styled.div`
  position: relative;
  max-width: 920px;
  padding: 40px 25px;
  height: 560px;

  border-radius: 15px;
  width: 100%;
  background: ${colors.white};

  @media screen and (max-width: 730px) {
    height: 575px;
  }

  @media screen and (max-width: 428px) {
    height: 550px;
  }

  @media screen and (max-width: 320px) {
    height: 640px;
  }
`;

export const Cover = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  height: 100%;
  width: 50%;

  ::before,
  ::after {
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    background: ${colors.sweetCarchoal};
    border-radius: 0px 15px 15px 0px;
    z-index: 10;
  }

  @media screen and (max-width: 730px) {
    display: none;
  }
`;

export const Front = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

export const ImageComponent = styled.img`
  position: absolute;
  height: 58%;
  margin: 10px 5px;
  width: 100%;
  z-index: 12;

  @media screen and (max-width: 820px) {
    height: 50%;
    margin: 30px 5px;
  }
`;

export const TextWrapper = styled.div`
  position: absolute;
  z-index: 12;
  height: 90%;
  width: 90%;
  display: flex;
  margin-left: 40px;
  align-items: center;

  @media screen and (max-width: 820px) {
    margin-left: 22px;
  }
`;

export const Title = styled.h1`
  position: relative;
  top: 150px;
  font-family: "Guillon", sans-serif;
  line-height: 46px;
  font-weight: 700;
  font-size: 2.7rem;
  color: ${colors.sweetBlack};
  z-index: 12;
  width: 100%;

  @media screen and (max-width: 820px) {
    top: 130px;
  }
`;

export const BottomWrapper = styled.div`
  position: relative;
  z-index: 130;
  top: 470px;
  left: 40px;
  width: 89%;
  opacity: 0.9;

  &:before {
    position: absolute;
    content: "";
    width: 120px;
    height: 1px;
    background-color: ${colors.sweetBlack};
  }

  @media screen and (max-width: 820px) {
    top: 450px;
    left: 24px;
  }
`;

export const Content = styled.p`
  position: absolute;
  margin-left: 130px;
  margin-top: -10px;
  font-family: "AllianceM", sans-serif;
  font-size: 15px;
  color: ${colors.sweetBlack};
`;

export const FormWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

export const FormContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SignUpForm = styled.div`
  width: calc(100% / 2 - 25px);

  @media (max-width: 730px) {
    width: 100%;
  }
`;

export const TitleForm = styled.h1`
  position: relative;
  font-family: "Guillon", sans-serif;
  font-weight: 500;
  font-size: 2.2rem;
  margin-top: 10px;

  span {
    color: ${colors.green};
  }

  @media screen and (max-width: 820px) {
    font-size: 2rem;
  }

  @media screen and (max-width: 428px) {
    text-align: center;
    font-size: 2rem;
  }

  @media screen and (max-width: 390px) {
    font-size: 1.7rem;
  }
`;

export const ContentForm = styled.p`
  font-family: "AllianceM", sans-serif;
  margin: 5px 0px 20px;
  font-size: 16px;
  color: ${colors.sweetBlack};
  opacity: 0.9;

  @media screen and (max-width: 428px) {
    text-align: center;
  }

  @media screen and (max-width: 390px) {
    font-size: 14px;
  }
`;

export const Form = styled.form`
  position: relative;
`;

export const InputBoxes = styled.div`
  margin: 25px 0px;
`;

export const InputBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 3rem;
  margin: 20px 0px;
  flex-direction: column;
  position: relative;
`;

export const Label = styled.label`
  position: absolute;
  left: 1rem;
  top: 0.8rem;
  padding: 0 0.5rem;
  color: ${colors.green};
  cursor: text;
  font-family: "AllianceM", sans-serif;
  background: ${colors.white};
`;

export const Input = styled.input`
  position: absolute;
  top: 0;
  font-family: "AllianceM", sans-serif;
  left: 0;
  border: 2px solid ${colors.green};
  border-radius: 5px;
  height: 100%;
  width: 100%;
  font-weight: bold;
  outline: none;
  opacity: 0.7;
  padding: 15px;

  &:focus + label,
  &:valid + label {
    top: -0.5rem;
    font-size: 13px;
    left: 0.5rem;
  }

  &::placeholder {
    color: ${colors.sweetBlack};
  }
`;

export const ButtonRegister = styled.button<ButtonProps>`
  padding: 8px;
  border: none;
  outline: none;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  font-family: "AllianceM", sans-serif;
  font-weight: bold;
  background: ${colors.green};
  color: ${colors.white};
  font-size: 16px;
  cursor: ${(props) => (props.cursor ? "not-allowed" : "pointer")};
`;

export const Attributes = styled.p`
  font-size: 15px;
  margin: -5px 0px;
  text-align: center;
  font-family: "AllianceM", sans-serif;
  opacity: 0.9;

  a {
    color: ${colors.green};
  }
`;

export const ErrorContent = styled.p`
  font-size: 13px;
  font-family: "AllianceM", sans-serif;
  opacity: 0.9;
  margin-bottom: -8px;
  margin-top: -12px;
  color: ${colors.pink};
`;
