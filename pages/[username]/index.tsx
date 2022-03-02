import React, { useContext, useEffect, useState } from "react";
import { ContentError } from "@components/404/error";
import { Container } from "@styles/global.styles";
import { useGetProfileQuery } from "generated/graphql";
import { useRouter } from "next/router";
import { AuthContext } from "@context/AuthContextProvider";
import Loading from "@components/Loading/loading";

const UserProfile = () => {
  const router = useRouter();
  const { loggedInUser } = useContext(AuthContext);
  const [isMyProfile, setIsMyProfile] = useState(false);
  const { username } = router.query;

  const { data, error, loading } = useGetProfileQuery({
    variables: {
      username: String(username),
    },
  });

  useEffect(() => {
    if (data) {
      if (data.getProfile?.username === loggedInUser?.username) {
        setIsMyProfile(true);
      } else {
        setIsMyProfile(false);
      }
    }
  }, [data, loggedInUser]);

  if (loading) return <Loading justifycontent="center" />;
  if (data.getProfile === null) {
    return (
      <ContentError
        margin="0px auto"
        content="Oops.. Username not found"
        imgUrl="/image/_error.png"
      />
    );
  }
  if (error) {
    return (
      <ContentError
        margin="0px auto"
        content="Oops.. Error"
        imgUrl="/image/_error.png"
      />
    );
  }

  return (
    <Container>
      UserProfile
      {data.getProfile.username}
      {/* {getUsername.getProfile.posts.map((post) => {
        return <div key={post.id}>{post.content}</div>;
      })} */}
      {isMyProfile && <button>Edit Profile</button>}
    </Container>
  );
};

export default UserProfile;
