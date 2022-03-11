import React from "react";
import styled from "styled-components";
import { BiSearchAlt } from "react-icons/bi";
import { colors } from "@styles/variables.styles";

type SearchComponentProps = {
  size: string;
};

const SearchContainer = styled.div<SearchComponentProps>`
  position: relative;
  width: ${(props) => props.size};
  height: 45px;
  padding: 10px;
  background: ${colors.carchoal};
  align-items: center;
  box-sizing: border-box;
  justify-content: space-between;
  display: flex;
  border-radius: 5px;
`;

const SearchInput = styled.input`
  padding-left: 15px;
  margin-top: -1px;
  outline: none;
  border: none;
  position: absolute;
  box-sizing: border-box;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: transparent;
  font-size: 17px;
  font-family: "Guillon", sans-serif;

  &::placeholder {
    font-size: 17px;
    opacity: 0.8;
  }
`;

const IconButton = styled.button`
  box-sizing: border-box;
  margin-top: -2px;
  margin-left: 300px;
  height: 30px;
  width: 30px;
  padding: 4px;
  border: none;
  z-index: 1;
  cursor: pointer;
  color: ${colors.black};
  background: transparent;
  border-radius: 50%;
`;

const Search: React.FC<SearchComponentProps> = (props) => {
  return (
    <SearchContainer size={props.size}>
      <IconButton type="submit">
        <BiSearchAlt size={25} />
      </IconButton>
      <SearchInput placeholder="Search something else.." />
    </SearchContainer>
  );
};

export default Search;
