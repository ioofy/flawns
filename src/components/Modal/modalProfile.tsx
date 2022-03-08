import React, { Dispatch, SetStateAction, useRef } from "react";
import { useSpring, animated } from "react-spring";
import { BiX } from "react-icons/bi";
import styled from "styled-components";

type ModalProfileProps = {
  isShowing: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
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

  @media screen and (max-width: 360px) {
    display: none;
  }
`;

const ModalWrapper = styled.div`
  width: 350px;
  height: 250px;
  background: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
`;

const Editor = styled.div`
  margin-top: 35px;
`;

const CloseModalIcon = styled(BiX)`
  cursor: pointer;
  position: absolute;
  margin-top: 5px;
  margin-left: 5px;
`;

const ModalProfile = ({
  isShowing,
  setShowModal,
  children,
}: ModalProfileProps) => {
  const modalRef = useRef(null);

  const animation = useSpring({
    config: { duration: 300 },
    opacity: isShowing ? "1" : "0",
    transform: isShowing ? `translateY(0%)` : `translateY(-100%)`,
  }) as any;

  return (
    <Container>
      {isShowing ? (
        <Background ref={modalRef}>
          <animated.div style={animation}>
            <ModalWrapper>
              <CloseModalIcon
                size={25}
                onClick={() => setShowModal((prev) => !prev)}
              />
              <Content>
                <Editor>{children}</Editor>
              </Content>
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </Container>
  );
};

export default ModalProfile;
