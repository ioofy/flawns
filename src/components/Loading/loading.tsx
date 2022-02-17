import React from "react";

import styled from "styled-components";

type LoadingProps = {
  justifyContent: string;
};

interface LoadingComponents {
  justifycontent: string;
}

const LoadingWrapper = styled.div<LoadingProps>`
  display: flex;
  justify-content: ${(props) => props.justifyContent};
`;

const Content = styled.p`
  font-family: "AllianceEB", sans-serif;
  font-size: 16px;
`;

const Loading = (props: LoadingComponents) => {
  return (
    <LoadingWrapper justifyContent={props.justifycontent}>
      <Content>⌛️ Loading..</Content>
    </LoadingWrapper>
  );
};

export default Loading;
