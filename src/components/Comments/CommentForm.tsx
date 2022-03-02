import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 370px;
`;

const CommentForms = styled.form`
  display: flex;
`;

const CommentArea = styled.textarea`
  padding: 10px 10px 0px;
  font-size: 15px;
  outline: none;
  border: none;
  font-family: "AllianceM", sans-serif;
  width: 100%;
  resize: none;
  background: skyblue;

  &::placeholder {
    color: black;
  }
`;

const CommentButton = styled.button`
  background: red;
  color: white;
  border: none;
  outline: none;
  width: 100px;
`;

const ReplyInfo = styled.p`
  margin: 10px 0px;
`;

const CommentForm = () => {
  const router = useRouter();
  const { username } = router.query;

  return (
    <Wrapper>
      <ReplyInfo>Reply @{username}</ReplyInfo>
      <CommentForms>
        <CommentArea placeholder="Comment" />
        <CommentButton>Reply</CommentButton>
      </CommentForms>
    </Wrapper>
  );
};

export default CommentForm;
