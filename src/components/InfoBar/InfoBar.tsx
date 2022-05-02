import React from "react";

type InfoBarProps = {
  commentCount: number;
  LikeCount?: number;
};

const InfoBar = (props: InfoBarProps) => {
  return (
    <div>
      <p>Comment : {props.commentCount}</p>
      <p>Like: {props.LikeCount}</p>
    </div>
  );
};

export default InfoBar;
