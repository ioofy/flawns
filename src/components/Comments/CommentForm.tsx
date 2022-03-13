import React, { useState, useContext } from "react";
import { useCommentCreateMutation } from "generated/graphql";
import { useRouter } from "next/router";
import { toast, Toaster } from "react-hot-toast";
import { AuthContext } from "@context/AuthContextProvider";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 370px;

  .toaster {
    font-family: "AllianceEB", sans-serif;
    font-size: 15px;
  }
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
  cursor: pointer;
`;

const ReplyInfo = styled.p`
  margin: 10px 0px;
`;

const CommentForm = () => {
  const router = useRouter();
  const { username, id } = router.query;
  const { loggedInUser } = useContext(AuthContext);
  const [comment, setComment] = useState("");

  const [createComment, { loading }] = useCommentCreateMutation({
    onCompleted: (data) => {
      console.log(data);

      if (data) {
        if (!data.commentCreate.userErrors.length) {
          toast.success("Your comment has been posted");
          setComment("");
        }
        if (data.commentCreate.userErrors.length) {
          toast.error(data.commentCreate.userErrors[0].message);
        }
      }
    },
  });

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await createComment({
      variables: {
        comment: {
          text: comment,
          postId: String(id),
        },
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // assign in into hooks
    setComment(e.target.value);
  };

  return (
    <Wrapper>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        containerClassName="toaster"
      />
      {loggedInUser && (
        <>
          <ReplyInfo>Reply @{username}</ReplyInfo>
          <CommentForms>
            <CommentArea placeholder="Comment" onChange={handleChange} />
            <CommentButton onClick={handleClick}>
              {loading ? "Loading.." : "Reply"}
            </CommentButton>
          </CommentForms>
        </>
      )}
    </Wrapper>
  );
};

export default CommentForm;
