import React, { useState } from "react";
import { useRouter } from "next/router";
import { useCommentsQuery, useGetPostQuery } from "generated/graphql";
import { Container } from "@styles/global.styles";
import { ContentError } from "@components/404/error";
import styled from "styled-components";
import Loading from "@components/Loading/loading";
import * as Sentry from "@sentry/nextjs";
import IntoNow from "@components/Moment/intoNow";
import SEO from "@components/Metadata/SEO";

const PostCard = styled.div`
  width: 370px;
  height: 370px;
  background-color: pink;
  margin: 20px 0;
  padding: 20px;
  font-family: "AllianceM";
  font-size: 15px;
`;

const PostDetail = () => {
  const [offset, setOffset] = useState(3);
  const router = useRouter();
  const { id, username } = router.query;

  // get post data
  const {
    data: postData,
    error: postError,
    loading: postLoading,
  } = useGetPostQuery({
    variables: {
      postId: String(id),
    },
  });

  // get comment data
  const {
    data: commentsData,
    error: commentsError,
    networkStatus,
    fetchMore,
  } = useCommentsQuery({
    variables: {
      postId: String(id),
      limit: 3,
      offset: 0,
    },
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  if (!commentsData || !commentsData.comments || postLoading) {
    return <Loading justifycontent="center" />;
  }

  if (postError || commentsError) {
    Sentry.captureException(postError || commentsError);
    return (
      <ContentError
        margin="0px auto"
        content="Theres an error this caused in our server or something."
        imgUrl="/image/_error.png"
      />
    );
  }

  const getPostWithId = postData?.getPost;
  const getComment = commentsData?.comments;
  const isRefetching = networkStatus === 3;

  const handleMore = () => {
    const nextOffset = offset + 3;
    setOffset(nextOffset);

    fetchMore({
      variables: {
        limit: 3,
        offset,
      },

      updateQuery: (prevResult, { fetchMoreResult }) => {
        return {
          ...prevResult,
          comments: [...prevResult.comments, ...fetchMoreResult.comments],
        };
      },
    });
  };

  return (
    <Container>
      <SEO
        title={`${username} on Flawn: "${getPostWithId?.content}"`}
        description={`${username} on Flawn: "${getPostWithId?.content}"`}
      />
      <PostCard>
        <p>{getPostWithId?.content}</p>
        <p>{getPostWithId?.user.name}</p>
        <p>{username}</p>
        <p>❤️Likes {getPostWithId?.likes.length}</p>
        <p>💬Comment: {getPostWithId?.comments.length}</p>
        <p>{isRefetching && "Loadinggg..."}</p>
        {getComment?.length >= offset && (
          <button
            type="button"
            onClick={() => handleMore()}
            style={{
              display:
                getPostWithId?.comments.length === getComment?.length
                  ? "none"
                  : "block",
            }}
          >
            Load More
          </button>
        )}
        {getComment?.map((comment) => {
          return (
            <div key={comment.id} style={{ margin: "15px 0" }}>
              <p style={{ marginLeft: "-10px" }}>
                by {comment?.user.name} ·{" "}
                <IntoNow actualDate={comment?.createdAt} interval={1000} />
              </p>
              <p>{comment?.text}</p>
            </div>
          );
        })}
      </PostCard>
    </Container>
  );
};

export default PostDetail;
