import React from "react";
import CommentDisplay from "@components/Comments/CommentDisplay";
import Loading from "@components/Loadings/Loading";
import SEO from "@components/Metadata/SEO";
import styled from "styled-components";
import CommentForm from "@components/Comments/CommentForm";
import IntoNow from "@components/Moments/IntoNow";
import Avatar from "@components/Avatars/Avatar";
import Link from "next/link";
import * as Sentry from "@sentry/nextjs";
import { Container } from "@styles/global.styles";
import { useGetPostsQuery } from "generated/graphql";
import { ContentErrors } from "@components/CustomError/Error";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const { id, username } = router.query;

  // get post data
  const {
    data: postData,
    error: postError,
    loading: postLoading,
  } = useGetPostsQuery({
    variables: {
      postId: String(id),
    },
  });

  if (postLoading) {
    return <Loading justifycontent="center" />;
  }

  if (postError) {
    Sentry.captureException(postError);
    return (
      <ContentErrors
        margin="0px auto"
        content="Theres an error this caused in our server or something."
        imgUrl="/image/_error.png"
      />
    );
  }

  const getPostWithId = postData?.getPost;

  return (
    <Container>
      <SEO
        title={`${username} on Flawn: "${getPostWithId?.content}"`}
        description={`${username} on Flawn: "${getPostWithId?.content}"`}
      />
      PostDetail
      <PostCard>
        <Avatar
          userId={getPostWithId?.user.id}
          altText={getPostWithId?.user.username}
          height={45}
          width={45}
        />
        <p>
          {getPostWithId?.user.name} -
          <Link href={`/${username}`}>
            <a>@{username}</a>
          </Link>{" "}
          · <IntoNow actualDate={getPostWithId?.createdAt} interval={1000} />
        </p>
        <p>{getPostWithId?.content}</p>
      </PostCard>
      <CommentForm />
      <CommentDisplay />
    </Container>
  );
};

export default PostDetail;
