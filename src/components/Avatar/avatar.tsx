import Image from "next/image";
import React from "react";
import styled from "styled-components";

type AvatarComponentProps = {
  imgUrl: string;
  altText: string;
  height: number;
  width: number;
  marginleft?: string;
};

type ImageProps = {
  marginleft: string;
};

const AvatarSize = styled.div`
  max-width: 100%;
`;

const AvatarImage = styled(Image)<ImageProps>`
  border-radius: 99px;
  margin-left: ${(props) => props.marginleft} !important;
`;

const Avatar: React.FC<AvatarComponentProps> = (props) => {
  return (
    <AvatarSize>
      <AvatarImage
        src={props.imgUrl}
        alt={props.altText}
        height={props.height}
        width={props.width}
        objectFit="contain"
        quality={100}
        loading="lazy"
        // custom props styling
        marginleft={props.marginleft}
      />
    </AvatarSize>
  );
};

export default Avatar;
