import React, { useState, useContext } from "react";
import { NetworkStatus } from "@apollo/client";
import { Container } from "@styles/global.styles";
import { usePostQuery } from "generated/graphql";
import { ContentErrors } from "@components/CustomError/Error";
import { InView } from "react-intersection-observer";
import { AuthContext } from "@context/AuthContextProvider";
import styled from "styled-components";
import Avatar from "@components/Avatars/Avatar";
import Link from "next/link";
import Loading from "@components/Loadings/Loading";
import IntoNow from "@components/Moments/IntoNow";
import SEO from "@components/Metadata/SEO";
import * as Sentry from "@sentry/nextjs";

const PostCard = styled.div`
  padding: 10px;
  height: 370px;
  background-color: pink;
  width: 320px;
  margin: 20px 0px;
`;

const Post = () => {
  const { loggedInUser } = useContext(AuthContext);
  const [fullyLoaded, setFullyLoaded] = useState<any>(false);

  const { data, networkStatus, error, fetchMore, variables } = usePostQuery({
    variables: {
      limit: 5,
      offset: 0,
    },
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  if (error) {
    Sentry.captureException(error);
    return (
      <ContentErrors
        margin="0px auto"
        content="Theres an error this caused in our server or something."
        imgUrl="/image/_error.png"
      />
    );
  }

  const isRefetching = networkStatus === 3;
  const isLoading = networkStatus === 1;
  const posts = data?.posts;

  return (
    <Container>
      <SEO
        title="Post Feed"
        description="Lets create something interest now."
      />
      {isLoading && <Loading justifycontent="center" />}
      {loggedInUser && !isLoading && <button>Create Post</button>}
      {posts?.map((post) => {
        return (
          <Link
            key={post?.id}
            href={`/${post?.user.username}/status/${post?.id}`}
          >
            <PostCard>
              <Avatar
                altText={post?.user.name}
                height={45}
                width={45}
                userId={post?.user.id}
              />
              <p>
                {post?.user.name}
                <span>
                  <Link key={post?.id} href={`/${post?.user.username}`}>
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

      {isRefetching && (
        <Loading justifycontent="flex-start" style={{ marginBottom: "10px" }} />
      )}

      {networkStatus !== NetworkStatus.fetchMore &&
        posts?.length % variables.limit === 0 &&
        !fullyLoaded && (
          <InView
            onChange={async (inView) => {
              if (inView) {
                const result = await fetchMore({
                  variables: {
                    offset: data?.posts.length,
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
