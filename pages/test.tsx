import { useQuery, gql } from "@apollo/client";
import React from "react";
import styled from "styled-components";

const GET_INFO = gql`
  query Status {
    status
  }
`;

const Container = styled.div``;

const Test = () => {
  const { loading, error, data } = useQuery(GET_INFO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data);

  return (
    <Container>
      <p>{data?.status}</p>
    </Container>
  );
};

export default Test;
