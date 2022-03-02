import React from "react";
import styled, { keyframes } from "styled-components";

type LoadingProps = {
  justifyContent: string;
};

interface LoadingComponents {
  justifycontent: string;
  // custom any css styles
  style?: React.CSSProperties;
}

const LoadingWrapper = styled.div<LoadingProps>`
  display: flex;
  justify-content: ${(props) => props.justifyContent};
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 4px solid grey;
  border-right: 4px solid grey;
  border-bottom: 4px solid grey;
  border-left: 4px solid black;
  background: transparent;
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

const Loading = (props: LoadingComponents) => {
  return (
    <LoadingWrapper
      justifyContent={props.justifycontent}
      style={props.style}
      className="loading"
    >
      <Spinner />
    </LoadingWrapper>
  );
};

export default Loading;
