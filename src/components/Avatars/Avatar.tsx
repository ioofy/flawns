import { useGetProfilePhotoQuery } from "generated/graphql";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

type AvatarComponentProps = {
  altText: string;
  height: number;
  width: number;
  marginleft?: string;
  userId: string;
};

type ImageProps = {
  marginleft: string;
};

const AvatarContainer = styled.div`
  max-width: 100%;
`;

const AvatarImage = styled(Image)<ImageProps>`
  border-radius: 99px;
  margin-left: ${(props) => props.marginleft} !important;
`;

const Avatar: React.FC<AvatarComponentProps> = (props) => {
  const { data } = useGetProfilePhotoQuery({
    variables: {
      userId: props.userId,
    },
  });

  return (
    <>
      {data?.getProfilePhoto.avatarUrl && (
        <AvatarContainer>
          <AvatarImage
            src={data.getProfilePhoto.avatarUrl}
            alt={props.altText}
            height={props.height}
            width={props.width}
            objectFit="contain"
            quality={100}
            blurDataURL="1"
            placeholder="blur"
            priority
            // custom props styling
            marginleft={props.marginleft}
          />
        </AvatarContainer>
      )}
    </>
  );
};

export default Avatar;
