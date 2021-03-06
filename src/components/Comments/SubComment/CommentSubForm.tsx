import { AuthContext } from "@context/AuthContextProvider";
import { useCreateSubCommentMutation } from "generated/graphql";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 325px;
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
  background: orange;
  &::placeholder {
    color: black;
  }
`;

const CommentButton = styled.button`
  background: black;
  color: white;
  border: none;
  outline: none;
  width: 100px;
  cursor: pointer;
`;

const ReplyInfo = styled.p`
  margin: 10px 0px;
`;

const CommentSubForm = ({
  commentId,
  username,
}: {
  commentId: string;
  username: string;
}) => {
  const { loggedInUser } = useContext(AuthContext);

  const [createSubComment, { loading }] = useCreateSubCommentMutation();
  const [comment, setComment] = useState("");
  const [isMyComment, setIsMyComment] = useState(false);

  useEffect(() => {
    if (loggedInUser) {
      if (loggedInUser.username === username) {
        setIsMyComment(true);
      }
    }
  }, [loggedInUser, username]);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await createSubComment({
      variables: {
        subComment: {
          text: comment,
          commentId,
        },
      },

      onCompleted: (data) => {
        if (!data.subCommentCreate.userErrors.length) {
          toast.success("Your comment has been posted");
          setComment("");
        }
        if (data.subCommentCreate.userErrors.length) {
          toast.error(data.subCommentCreate.userErrors[0].message);
        }
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // assign in into hooks
    setComment(e.target.value);
  };

  return (
    <Wrapper>
      {loggedInUser && (
        <>
          <ReplyInfo>Reply @{isMyComment ? "Myself" : username}</ReplyInfo>
          <CommentForms>
            <CommentArea
              placeholder="Replies to this comment"
              onChange={handleChange}
              value={comment}
            />
            <CommentButton onClick={handleClick}>
              {loading ? "Loading.." : "Reply"}
            </CommentButton>
          </CommentForms>
        </>
      )}
    </Wrapper>
  );
};

export default CommentSubForm;
