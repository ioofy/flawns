import React from "react";
import { Container } from "@styles/global.styles";
import { ContentErrors } from "@components/CustomError/Error";
import SEO from "@components/Metadata/SEO";

const NotFound = () => {
  return (
    <Container>
      <SEO title="Ooops! Page not found" description="Ooops! Page not found" />
      <ContentErrors
        margin="0px auto"
        content="👻 Oops... there’s nothing in here"
        imgUrl="/image/_404.png"
      />
    </Container>
  );
};

export default NotFound;
