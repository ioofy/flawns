import React from "react";
import { Container } from "@styles/global.styles";
import { ContentError } from "@components/404/error";

const NotFound = () => {
  return (
    <Container>
      <ContentError
        margin="0px auto"
        content="👻 Oops... there’s nothing in here"
        imgUrl="/image/_404.png"
      />
    </Container>
  );
};

export default NotFound;
