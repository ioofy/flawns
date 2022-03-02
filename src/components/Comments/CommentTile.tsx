import IntoNow from "@components/Moment/intoNow";
import React from "react";
import styled from "styled-components";

type CommentTileProps = {
  comment: {
    __typename?: "Comment";
    id: string;
    text: string;
    date?: any;
    user: {
      __typename?: "User";
      name: string;
      username?: string;
    };
  };
};

const CommentBox = styled.div`
  width: 370px;
  background-color: pink;
  margin: 10px 0;
  padding: 20px;
  font-family: "AllianceM";
  font-size: 15px;
`;

const CommentTile = ({ comment }: CommentTileProps) => {
  const {
    date,
    text,
    user: { name, username },
  } = comment;

  return (
    <CommentBox>
      <p>
        on <IntoNow actualDate={date} interval={1000} />
      </p>
      <p>
        By: {name} - {username}
      </p>
      <p>{text}</p>
    </CommentBox>
  );
};

export default CommentTile;
