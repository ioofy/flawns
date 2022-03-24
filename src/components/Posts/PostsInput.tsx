import React, { useState } from "react";
import { usePostCreateMutation } from "generated/graphql";
import EmojiPicker from "@components/Emojis/EmojiPicker";
import styled from "styled-components";
import ImagePicker from "@components/Emojis/ImagePicker";
import toast from "react-hot-toast";

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 200px;
`;

const BottomContent = styled.div`
  margin: 30px 0px;
  position: absolute;
  z-index: 1;

  @media screen and (max-width: 768px) {
    .emoji-picker {
      display: none;
    }
  }
`;

const Input = styled.input`
  width: 100%;
`;

interface Props {
  onPostCreated: () => void;
}

const PostsInput = (props: Props) => {
  const [input, setInput] = useState("");

  const [createPost, { loading }] = usePostCreateMutation({
    onCompleted: (data) => {
      if (!data.postCreate.userErrors.length) {
        setInput("");
        props.onPostCreated();
        toast.success("Your post has been created!");
      } else {
        toast.error(data.postCreate.userErrors[0].message);
      }
    },
  });

  const addEmoji = (e: any) => {
    // split emoji picker
    const symbol = e.unified.split("-");

    // add emoji to input
    const codesArray: any = [];
    symbol.forEach((el: string) => codesArray.push("0x" + el));
    const emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    createPost({
      variables: {
        post: {
          content: input,
        },
      },
    });
  };

  return (
    <Container>
      <div>
        <Input
          type="text"
          placeholder="Whats hapenning?"
          autoComplete="off"
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
        />
        <button style={{ margin: "50px 0px" }} onClick={handleClick}>
          {loading ? "Loading..." : "Post"}
        </button>
      </div>
      <BottomContent>
        <ImagePicker />
        <EmojiPicker onEmojiClick={addEmoji} theme="dark" />
      </BottomContent>
    </Container>
  );
};

export default PostsInput;
