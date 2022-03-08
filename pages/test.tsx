import { useQuery, gql } from "@apollo/client";
import React from "react";

const GET_INFO = gql`
  query Status {
    status
  }
`;

const Test = () => {
  const { loading, error, data } = useQuery(GET_INFO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data);

  return (
    <div>
      <p>info: {data.status}</p>
    </div>
  );
};

export default Test;
