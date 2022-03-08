import React, { useState } from "react";
import Avatar from "react-avatar-edit";

type ImageUploadProps = {
  urlAvatar: string;
};

export default function ImageUpload(props: ImageUploadProps) {
  const [preview, setPreview] = useState(null);
  const [src] = useState(props.urlAvatar);

  const onClose = () => {
    setPreview(null);
  };

  const onCrop = (preview: string) => {
    setPreview(preview);
  };

  const onBeforeFileLoad = (elem: React.ChangeEvent<HTMLInputElement>) => {
    if (elem.target.files[0].size > 700000) {
      alert("File is too big!");
      elem.target.value = "";
    } else {
      console.log(elem.target.files[0]);
    }
  };

  const handleClick = () => {
    console.log(preview);
  };

  return (
    <div>
      <Avatar
        width={200}
        height={200}
        onCrop={onCrop}
        onClose={onClose}
        onBeforeFileLoad={onBeforeFileLoad}
        src={src}
      />

      <button onClick={handleClick}>Submit</button>
    </div>
  );
}
