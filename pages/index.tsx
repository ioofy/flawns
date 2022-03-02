import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ArtBoard from "@components/Artboard/artboard";
import Loading from "@components/Loading/loading";
import type { NextPage } from "next";
import { colors } from "@styles/variables.styles";
import { useCheckUsernameMutation } from "generated/graphql";
import SEO from "@components/Metadata/SEO";
import Header from "@layout/components/Header/Header";
import Footer from "@layout/components/Footer/Footer";

const Form = styled.form`
  margin-bottom: 15px;
`;

const InputForm = styled.input`
  outline: none;
  border: none;
  height: 48px;
  border-radius: 5px;
  padding: 20px;
  font-size: 17px;
  font-family: "Guillon", sans-serif;
  margin-bottom: 15px;
  color: ${colors.black};
  width: 350px;
  background: ${colors.carchoal};

  &::placeholder {
    opacity: 0.9;
  }

  @media screen and (max-width: 991px) {
    width: 100%;
  }
`;

const ButtonSearch = styled.button`
  height: 48px;
  border-radius: 4px;
  width: 190px;
  padding: 8px;
  position: relative;
  cursor: pointer;
  margin-left: 10px;
  outline: none;
  border: none;
  font-family: "Guillon", sans-serif;
  font-size: 17px;
  background: ${colors.black};
  color: ${colors.white};

  &::after {
    content: "";
    border-radius: 4px;
    position: absolute;
    z-index: -1;
    left: 8px;
    top: 6px;
    width: 97%;
    height: 92%;
    background: transparent;
    border: 2px solid ${colors.black};
  }

  @media screen and (max-width: 991px) {
    width: 99%;
    margin-left: 0px;

    &::after {
      width: 99%;
      left: 5px;
      top: 4px;
    }
  }

  @media screen and (max-width: 280px) {
    width: 99%;
    margin-left: 0px;

    &::after {
      width: 98%;
      left: 5px;
      top: 4px;
    }
  }
`;

const NotificationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const ErrorContent = styled.p`
  font-family: "AllianceEB", sans-serif;
  opacity: 0.9;
  font-size: 15px;
  color: ${colors.pink};
`;

const learnContent = `Learn about <a href="/about">why</a>, you must trying Meraki 🤗`;
const urlImage = `/image/_socials.png`;

const Home: NextPage = () => {
  const Attributes = () => {
    const [checkUsername, { data, loading }] = useCheckUsernameMutation();

    const [username, setUsername] = useState("");
    const [errors, setErrors] = useState("");

    const handleClick = (e: React.FormEvent) => {
      e.preventDefault();
      checkUsername({
        variables: {
          username,
        },
      });
    };

    useEffect(() => {
      if (data) {
        const { checkUsername } = data;

        if (checkUsername.userErrors.length) {
          setErrors(checkUsername.userErrors[0].message);
        } else {
          setErrors(`🎉Congrats! You can use this username.`);
        }
      }
    }, [data]);

    return (
      <Form>
        <NotificationWrapper>
          {loading && <Loading justifycontent="flex-start" />}
          {errors && <ErrorContent>{errors}</ErrorContent>}
        </NotificationWrapper>
        <InputForm
          type="text"
          placeholder="@ Enter a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <ButtonSearch onClick={handleClick}>Search avaliability</ButtonSearch>
      </Form>
    );
  };

  return (
    <>
      <Header />
      <SEO />
      <ArtBoard
        altText="image-icons"
        imgUrl={urlImage}
        headerContent="A platform socials for developers, creators, and more."
        subtitleContent="Share your idea, question, projects, accomplishment, and everything else you do - all in one place 💙."
        learnContent={learnContent}
        customizeAttributes={<Attributes />}
      />
      <Footer />
    </>
  );
};

export default Home;
