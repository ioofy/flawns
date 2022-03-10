import React from "react";
import { useState } from "react";
import Avatar from "react-avatar-edit";

export default function ImageUpload() {
  const [preview, setPreview] = useState(null);
  const [src] = useState("https://i.imgur.com/5fh5cPN.jpg");

  const onClose = () => {
    setPreview(null);
  };

  const onCrop = (preview: string) => {
    setPreview(preview);
  };

  const onBeforeFileLoad = (elem: any) => {
    if (elem.target.files[0].size > 71680) {
      alert("File is too big!");
      elem.target.value = "";
    } else {
      console.log(elem.target.files[0]);
      // get the normale photo
    }
  };

  console.log(preview);

  return (
    <div>
      <Avatar
        width={250}
        height={250}
        onCrop={onCrop}
        onClose={onClose}
        onBeforeFileLoad={onBeforeFileLoad}
        src={src}
      />
      <img src={preview} alt="Preview" />
    </div>
  );
}
