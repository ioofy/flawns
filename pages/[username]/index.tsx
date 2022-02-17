import { ContentError } from "@components/404/error";
import { Container } from "@styles/global.styles";
import { useGetProfileQuery } from "generated/graphql";
import { useRouter } from "next/router";
import React from "react";
import Loading from "@components/Loading/loading";

const UserProfile = () => {
  const router = useRouter();
  const { username } = router.query;

  const {
    data: getUsername,
    error,
    loading,
  } = useGetProfileQuery({
    variables: {
      username: String(username),
    },
  });

  if (loading) return <Loading justifycontent="center" />;
  if (error || getUsername.getProfile === null) {
    return (
      <ContentError
        margin="0px auto"
        content="Oops.. Username not found"
        imgUrl="/image/_error.png"
      />
    );
  }

  return (
    <Container>
      UserProfile
      {getUsername.getProfile.username}
      {getUsername.getProfile.posts.map((post) => {
        return <div key={post.id}>{post.content}</div>;
      })}
    </Container>
  );
};

export default UserProfile;
