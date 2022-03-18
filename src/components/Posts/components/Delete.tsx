import Modal from "@components/Modals/Modal";
import { AuthContext } from "@context/AuthContextProvider";
import React, { useState, useContext, useEffect } from "react";
import { BiTrash } from "react-icons/bi";
import styled from "styled-components";

const PopupDeleteContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

type DeleteProps = {
  username: string;
};

const Delete = (props: DeleteProps) => {
  const [showModal, setShowModal] = useState(false);
  const [isMyPost, setIsMyPost] = useState(false);
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

  return (
    <>
      {isMyPost && (
        <BiTrash size={21} style={{ cursor: "pointer" }} onClick={openModal} />
      )}

      <Modal
        isShowing={showModal}
        setShowModal={setShowModal}
        customHeight="300px"
        customWidth="350px"
        customBg="#fff"
        customBorder="15px"
      >
        <PopupDeleteContainer>
          <h2>Delete Post?</h2>
          <p>This action cannot be undone</p>
          <button>Delete</button>
          <button onClick={closeModal}>Cancel</button>
        </PopupDeleteContainer>
      </Modal>
    </>
  );
};

export default Delete;
