import React from "react";
import { useRouter } from "next/router";
import { Container } from "@styles/global.styles";
import { colors } from "@styles/variables.styles";
import styled from "styled-components";
import SEO from "@components/Metadata/SEO";

const WrapperContent = styled.div`
  max-width: 850px;
  margin: auto;
  text-align: center;
`;

const Image = styled.img`
  border: 0;
  width: 80%;
  display: block;
  margin: auto;

  @media screen and (max-width: 991px) {
    width: 100%;
  }
`;

const WrappAll = styled.div`
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Heading = styled.h1`
  margin-left: 28px;
  font-size: 27px;
  font-family: "AllianceM";
  color: ${colors.black};
  opacity: 0.8;
  text-align: center;

  @media screen and (max-width: 820px) {
    margin-left: 0px;
    font-size: 24px;
  }
`;

const ThankyouNotification = () => {
  const router = useRouter();
  const { username } = router.query;

  return (
    <Container>
      <SEO
        title="Confirm your email"
        description="Thanks for signup into our apps. Lets confirm your email"
      />
      <WrappAll>
        <WrapperContent>
          <Image src="/image/_wait.png" alt="avatar_wait" />
          <Heading>👌Great {username}! Now please confirm your email.</Heading>
        </WrapperContent>
      </WrappAll>
    </Container>
  );
};

export default ThankyouNotification;
