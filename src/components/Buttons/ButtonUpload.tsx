import React from "react";
import styled from "styled-components";
import { BiImageAdd } from "react-icons/bi";

const Wrapper = styled.div`
  position: absolute;
  margin-top: -90px;
  margin-left: 43px;
  z-index: 10;
  border-radius: 99px;
  background: rgba(0, 0, 0, 0.5);
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    color: white;
    cursor: pointer;
  }
`;

type ButtonUploadProps = {
  onChange: (e: any) => void;
};

export default function ButtonUpload(props: ButtonUploadProps) {
  return (
    <Wrapper>
      <label htmlFor="upload-button">
        <div>
          <span>
            <BiImageAdd size={25} />
          </span>
        </div>
      </label>

      <form>
        <input
          type="file"
          id="upload-button"
          accept=".jpg, .png, .jpeg"
          style={{ display: "none" }}
          onChange={props.onChange}
        />
      </form>
      <br />
    </Wrapper>
  );
}
