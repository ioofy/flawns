import React, { ReactNode } from "react";
import {
  Heading,
  ImgComponents,
  ImgWrapper,
  CustomWrapper,
  Learn,
  Subtitle,
  TextWrapper,
  WrapperColumn,
  WrapperRow,
  WrapperSection,
} from "./styles/artboard.styles";
import { Container } from "@styles/global.styles";

type ArtBoardComponentsProps = {
  imgStart?: boolean;
  imgUrl: string;
  altText: string;
  headerContent: string;
  subtitleContent: string;
  learnContent: string;
  customizeAttributes: ReactNode;
};

const ArtBoard: React.FC<ArtBoardComponentsProps> = (props) => {
  return (
    <WrapperSection>
      <Container>
        <WrapperRow imgStart={props.imgStart}>
          <WrapperColumn>
            <ImgWrapper>
              <ImgComponents src={props.imgUrl} alt={props.altText} />
            </ImgWrapper>
          </WrapperColumn>
          <WrapperColumn>
            <TextWrapper>
              <Heading>{props.headerContent}</Heading>
              <Subtitle>{props.subtitleContent}</Subtitle>
              <CustomWrapper>{props.customizeAttributes}</CustomWrapper>
              <Learn
                dangerouslySetInnerHTML={{ __html: props.learnContent }}
              ></Learn>
            </TextWrapper>
          </WrapperColumn>
        </WrapperRow>
      </Container>
    </WrapperSection>
  );
};

export default ArtBoard;
