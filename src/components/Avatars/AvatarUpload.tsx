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

type AvatarUploadProps = {
  avatarUrl: string;
  onClick: () => void;
};

export default function AvatarUpload(props: AvatarUploadProps) {
  const [preview, setPreview] = useState<string>(null);
  const [src] = useState(props.avatarUrl);

  const [uploadImage, { loading }] = useUpdatePhotoProfileMutation({
    onCompleted: (data) => {
      if (data) {
        if (data.updatePhotoProfile.message) {
          toast.success(data.updatePhotoProfile.message);
        }
        if (data.updatePhotoProfile.userErrors.length) {
          toast.error(data.updatePhotoProfile.userErrors[0].message);
        }
      }
    },
  });

  const onClose = () => {
    setPreview(null);
    props.onClick();
  };

  const onCrop = (preview: string) => {
    setPreview(preview);
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
      <div className="__avatar-container">
        <Avatar
          width={370}
          height={350}
          onCrop={onCrop}
          onClose={onClose}
          src={src}
          exportAsSquare
        />
      </div>

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
