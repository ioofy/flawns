import React, { useState } from "react";
import { NetworkStatus } from "@apollo/client";
import { Container } from "@styles/global.styles";
import { usePostQuery } from "generated/graphql";
import { ContentError } from "@components/404/error";
import { InView } from "react-intersection-observer";
import styled from "styled-components";
import Link from "next/link";
import Loading from "@components/Loading/loading";
import Avatar from "@components/Avatar/avatar";
import IntoNow from "@components/Moment/intoNow";
import * as Sentry from "@sentry/nextjs";
import SEO from "@components/Metadata/SEO";

const PostCard = styled.div`
  padding: 10px;
  height: 370px;
  background-color: pink;
  width: 320px;
  margin: 20px 0px;
`;

const Post = () => {
  const [fullyLoaded, setFullyLoaded] = useState<any>(false);
  const { data, networkStatus, error, fetchMore, variables } = usePostQuery({
    variables: {
      limit: 5,
      offset: 0,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (error) {
    Sentry.captureException(error);
    return (
      <ContentError
        margin="0px auto"
        content="Theres an error this caused in our server or something."
        imgUrl="/image/_error.png"
      />
    );
  }

  const posts = data?.posts;
  const isRefetching = networkStatus === 3;
  const isLoading = networkStatus === 1;

  return (
    <Container>
      <SEO
        title="Post Feed"
        description="Lets create something interest now."
      />
      {isLoading && <Loading justifycontent="center" />}
      {posts?.map((post) => {
        return (
          <Link
            key={post.id}
            href={`/post/${post.id}/status?username=${post.user.username}`}
          >
            <PostCard>
              <Avatar
                marginleft="-10px"
                imgUrl={post?.user.avatarUrl}
                altText={post?.user.name}
                height={65}
                width={65}
              />
              <p>{post?.id}</p>
              <p>
                {post?.user.name}
                <span>
                  <Link key={post.id} href={`/${post.user.username}`}>
                    <a> @{post?.user.username}</a>
                  </Link>
                  · <IntoNow actualDate={post?.createdAt} interval={1000} />
                </span>
              </p>
              <p>{post?.content}</p>
              <p>❤️Likes {post?.likes.length}</p>
              <p>💬Comment: {post?.comments.length}</p>
            </PostCard>
          </Link>
        );
      })}
      {isRefetching && "Loading sayang.."}
      {networkStatus !== NetworkStatus.fetchMore &&
        posts?.length % variables.limit === 0 &&
        !fullyLoaded && (
          <InView
            onChange={async (inView) => {
              if (inView) {
                const result = await fetchMore({
                  variables: {
                    offset: posts.length,
                  },
                });
                setFullyLoaded(!result.data.posts.length);
              }
            }}
          />
        )}
    </Container>
  );
};

export default Post;
