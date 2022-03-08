import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { colors, maxWidth } from "@styles/variables.styles";
import Search from "@components/Search/Search";

type ButtonProps = {
  margin: string;
  background: string;
  boxshadowBg: string;
  colors: string;
  border: string;
};

const Nav = styled.nav`
  height: 80px;
  margin: 10px 0px;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 999;
`;

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  z-index: 1;
  width: 100%;
  padding: 15px;
  max-width: ${maxWidth.large};
`;

const SideItem = styled.div`
  display: flex;
  align-items: center;

  /* display none if we reach a media with 600px */
  @media screen and (max-width: 820px) {
    display: none;
  }
`;

const Button = styled.button<ButtonProps>`
  border: ${(props) => props.border};
  outline: none;
  border-radius: 4px;
  padding: 12px;
  cursor: pointer;
  margin: ${(props) => props.margin};
  position: relative;
  background: ${(props) => props.background};
  color: ${(props) => props.colors};
  font-family: "Guillon";
  font-size: 17px;
  width: 6.5rem;

  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    left: 6px;
    top: 6px;
    border-radius: 4px;
    width: 95%;
    height: 90%;
    background: ${(props) => props.boxshadowBg};
    border: 2px solid black;
  }
`;

const NavLinks = styled.a`
  font-family: "Guillon";
  font-size: 35px;
  color: ${colors.black};
  cursor: pointer;
`;

const Header = () => {
  return (
    <Nav>
      <NavbarContainer>
        <Link href="/">
          <NavLinks>Flawn.</NavLinks>
        </Link>
        <SideItem>
          <Search size="348px" />
          <Link href="/auth/signin">
            <Button
              border="none"
              margin="0 3px 0 8px"
              colors={colors.white}
              background={colors.black}
              boxshadowBg="transparent"
            >
              Signin
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button
              border={`2px solid ${colors.black}`}
              colors={colors.black}
              margin="3px 9px 0px"
              background={colors.sweetGray}
              boxshadowBg={colors.black}
            >
              Signup
            </Button>
          </Link>
        </SideItem>
      </NavbarContainer>
    </Nav>
  );
};

export default Header;
