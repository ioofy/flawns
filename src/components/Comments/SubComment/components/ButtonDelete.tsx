import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "@context/AuthContextProvider";
import { BiTrash } from "react-icons/bi";
import {
  GetSubCommentsDocument,
  GetSubCommentsQuery,
  useSubCommentDeleteMutation,
} from "generated/graphql";
import Modal from "@components/Modals/Modal";
import styled from "styled-components";
import toast from "react-hot-toast";

const PopupDeleteContainer = styled.div`
  display: flex;
  margin: 20px 0px;
  flex-direction: column;
`;

const ButtonAction = styled.button<ButtonProps>`
  background-color: ${(props) => props.style};
  border: ${(props) => props.style};
  color: ${(props) => props.style};
  cursor: pointer;
  padding: 14px;
  min-height: 20px;
  white-space: nowrap;
  border-radius: 99px;
  margin: 10px 0px 0px;
  font-family: "AllianceM", sans-serif;
  font-size: 17px;
`;

const Title = styled.h2`
  font-size: 1.4rem;
  font-family: "AllianceEB", sans-serif;
`;

const Dialog = styled.p`
  font-size: 1.1rem;
  margin: 10px 0px 10px;
  font-family: "AllianceM", sans-serif;
  width: 240px;
`;

type DeleteProps = {
  commentId: string;
  subCommentId: string;
  username: string;
  onDeleted?: () => void;
};

type ButtonProps = {
  style: {
    [key: string]: any;
  };
};

export const ButtonDelete = (props: DeleteProps) => {
  const [showModal, setShowModal] = useState(false);
  const [isMyPost, setIsMyPost] = useState(false);
  const [deleteComment, { loading }] = useSubCommentDeleteMutation({
    update: (cache) => {
      const prevData = cache.readQuery<GetSubCommentsQuery>({
        query: GetSubCommentsDocument,
      });

      const filteringComments = prevData?.getSubComments?.subComments.filter(
        ({ id }) => id !== props.commentId,
      );

      if (filteringComments) {
        cache.writeQuery<GetSubCommentsQuery>({
          query: GetSubCommentsDocument,
          data: {
            getSubComments: {
              __typename: prevData?.getSubComments?.__typename,
              hasMore: prevData?.getSubComments?.hasMore,
              cursor: prevData?.getSubComments?.cursor,
              subComments: [...filteringComments],
            },
          },
        });
      }
    },
  });

  const { loggedInUser } = useContext(AuthContext);

  useEffect(() => {
    if (loggedInUser) {
      if (loggedInUser.username === props.username) {
        setIsMyPost(true);
      }
    }
  }, [loggedInUser, props.username]);
  // show modal update profile
  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onDelete = async () => {
    await deleteComment({
      variables: {
        subCommentId: props.subCommentId,
      },
      onCompleted: (data) => {
        if (!data.subCommentDelete.userErrors.length) {
          props.onDeleted();

          toast.success("Your Comment was deleted");
          closeModal();
        }
      },
    });
  };

  return (
    <>
      {isMyPost && (
        <BiTrash size={21} style={{ cursor: "pointer" }} onClick={openModal} />
      )}

      <Modal
        customHeightContent="auto"
        isShowing={showModal}
        setShowModal={setShowModal}
        customHeight="330px"
        customWidth="320px"
        customBg="#fff"
        customBorder="15px"
      >
        <PopupDeleteContainer>
          <Title>Delete Comment?</Title>
          <Dialog>
            This action can’t be undone, Are you sure want delete?
          </Dialog>
          <ButtonAction
            style={{
              color: "#fff",
              backgroundColor: "#f44336",
              border: "none",
            }}
            disabled={loading}
            onClick={onDelete}
          >
            {loading ? "Deleting..." : "Delete"}
          </ButtonAction>
          <ButtonAction
            style={{
              color: "#111",
              backgroundColor: "transparent",
              border: "1px solid gray",
            }}
            onClick={closeModal}
          >
            Cancel
          </ButtonAction>
        </PopupDeleteContainer>
      </Modal>
    </>
  );
};
