import React, { useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

type EmojiPickerProps = {
  onEmojiClick: (e: any) => any;
  theme: "dark" | "light" | "auto";
};

const EmojiPicker = (props: EmojiPickerProps) => {
  const [showEmojis, setShowEmojis] = useState(false);

  return (
    <>
      <BsEmojiSmile
        onClick={() => setShowEmojis(!showEmojis)}
        size={20}
        className="emoji-picker"
        style={{ cursor: "pointer" }}
      />
      {showEmojis && (
        <Picker
          onSelect={props.onEmojiClick}
          emoji="point_up"
          title=""
          style={{
            width: 300,
            borderRadius: 30,
          }}
          theme={props.theme}
        />
      )}
    </>
  );
};

export default EmojiPicker;
