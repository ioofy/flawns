import React, { Dispatch, SetStateAction, useRef } from "react";
import { BiX } from "react-icons/bi";
import styled from "styled-components";

type ModalProfileProps = {
  isShowing: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
  customWidth: number | string;
  customHeight: number | string;
  customBg: string;
  topTitle?: string;
  customBorder: string;
};

type ModalWrapperProps = {
  width: number | string;
  height: number | string;
  bg: string;
  border: string;
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  top: 0px;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 11;
`;

const ModalWrapper = styled.div`
  width: ${(props: ModalWrapperProps) => props.width};
  height: ${(props: ModalWrapperProps) => props.height};
  background: ${(props: ModalWrapperProps) => props.bg};
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  border-radius: ${(props: ModalWrapperProps) => props.border};

  @media screen and (max-width: 600px) {
    width: 100%;
    height: 100%;
    border-radius: 0px;
  }
`;

const Content = styled.div`
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TopWrapper = styled.div`
  display: block;
  margin-top: 15px;
`;

const CloseModalIcon = styled(BiX)`
  cursor: pointer;
  margin-top: 9px;
  margin-left: 10px;
  color: black;
`;

const TopTitle = styled.span`
  font-family: "AllianceEB", sans-serif;
  font-size: 20px;
  position: absolute;
  margin-top: 12px;
  margin-left: 20px;

  @media screen and (max-width: 600px) {
    margin-top: 13px;
  }
`;

const ModalProfile = ({
  isShowing,
  setShowModal,
  customHeight,
  customWidth,
  customBorder,
  topTitle,
  customBg,
  children,
}: ModalProfileProps) => {
  const modalRef = useRef(null);

  return (
    <Container>
      {isShowing ? (
        <Background ref={modalRef}>
          <ModalWrapper
            width={customWidth}
            height={customHeight}
            bg={customBg}
            border={customBorder}
          >
            <TopWrapper>
              <CloseModalIcon
                size={32}
                onClick={() => setShowModal((prev) => !prev)}
              />
              <TopTitle>{topTitle}</TopTitle>
            </TopWrapper>
            <Content>{children}</Content>
          </ModalWrapper>
        </Background>
      ) : null}
    </Container>
  );
};

export default ModalProfile;
