import Avatar from "@components/Avatars/Avatar";
import IntoNow from "@components/Moments/IntoNow";
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
      id: string;
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
    user: { id, name, username },
  } = comment;

  return (
    <CommentBox>
      <Avatar altText={username} height={55} width={55} userId={id} />
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
