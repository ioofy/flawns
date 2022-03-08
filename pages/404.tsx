import React from "react";
import { Container } from "@styles/global.styles";
import { ContentErrors } from "@components/404/Error";

const NotFound = () => {
  return (
    <Container>
      <ContentErrors
        margin="0px auto"
        content="👻 Oops... there’s nothing in here"
        imgUrl="/image/_404.png"
      />
    </Container>
  );
};

export default NotFound;
