import React, { useState } from "react";
import { useUpdatePhotoProfileMutation } from "generated/graphql";
import { toast, Toaster } from "react-hot-toast";
import Avatar from "react-avatar-edit";
import styled from "styled-components";

const Container = styled.div`
  .toaster {
    font-family: "AllianceEB", sans-serif;
    font-size: 15px;
  }
`;

export default function AvatarUpload() {
  const [preview, setPreview] = useState<string>(null);
  const [src] = useState("");

  const [uploadImage, { loading }] = useUpdatePhotoProfileMutation({
    onCompleted: (data) => {
      if (data) {
        if (data.updatePhotoProfile.message) {
          toast.success(data.updatePhotoProfile.message);
          // reload
          setInterval(function () {
            window.location.reload();
          }, 800);
        }
        if (data.updatePhotoProfile.userErrors.length) {
          toast.error(data.updatePhotoProfile.userErrors[0].message);
        }
      }
    },
  });

  const onClose = () => {
    setPreview(null);
  };

  const onCrop = (preview: string) => {
    setPreview(preview);
  };

  const onBeforeFileLoad = (elem: React.ChangeEvent<HTMLInputElement>) => {
    if (elem.target.files[0].size > 1000) {
      toast.error("File is too big! Please upload maximum size < 1mb");
      elem.target.value = "";
    } else {
      console.log(elem.target.files[0]);
    }

    // let image = new Image();

    // image.onload = () => {
    //   console.log(image.width);
    //   if (image.height > 199) {
    //     // alert("Image height must be less than 200px");

    //     elem.target.value = "";
    //     image.src = "";
    //   }
    // };

    // image.src = URL.createObjectURL(elem.target.files[0]);
  };

  const handleClick = () => {
    console.log(preview);

    if (!preview) {
      toast.error("Please select an image");
    } else {
      uploadImage({
        variables: {
          photo: preview,
        },
      });
    }
  };

  return (
    <Container>
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerClassName="toaster"
      />
      <Avatar
        width={350}
        height={350}
        onCrop={onCrop}
        onClose={onClose}
        onBeforeFileLoad={onBeforeFileLoad}
        src={src}
      />

      <button
        onClick={handleClick}
        style={{
          display: "block",
          margin: "15px auto",
        }}
      >
        {loading ? "Loading..." : "Submit"}
      </button>
    </Container>
  );
}
