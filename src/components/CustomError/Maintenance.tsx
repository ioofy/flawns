import { ContentErrors } from "@components/CustomError/Error";
import SEO from "@components/Metadata/SEO";
import React from "react";

const Maintenance = () => {
  return (
    <>
      <SEO
        title="Maintenance 👷🏿"
        description="Sorry, we are trying to improve this website. "
      />
      <ContentErrors
        margin="200px auto"
        imgUrl="/image/_maintenance.png"
        content="👷🏿 Our site is under maintenance. Please come back later🙏."
      />
    </>
  );
};

export default Maintenance;
