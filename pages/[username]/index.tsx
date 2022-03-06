import React, { useContext, useEffect, useState } from "react";
import { ContentError } from "@components/404/error";
import { Container } from "@styles/global.styles";
import { useGetProfilePostQuery, useGetProfileQuery } from "generated/graphql";
import { useRouter } from "next/router";
import { AuthContext } from "@context/AuthContextProvider";
import Loading from "@components/Loading/loading";
import SEO from "@components/Metadata/SEO";
import Image from "next/image";
import styled from "styled-components";

const PostCard = styled.div`
  padding: 10px;
  height: 370px;
  background-color: pink;
  width: 320px;
  margin: 20px 0px;
`;

const AvatarImage = styled(Image)``;

const UserProfile = () => {
  const router = useRouter();
  const [isMyProfile, setIsMyProfile] = useState(false);
  const { loggedInUser } = useContext(AuthContext);
  const { username } = router.query;

  const {
    data: ProfileData,
    error: ProfileError,
    loading: ProfileLoading,
  } = useGetProfileQuery({
    variables: {
      username: String(username),
    },
  });

  const {
    data: ProfilePostData,
    loading: ProfilePostLoading,
    error: ProfilePostError,
  } = useGetProfilePostQuery({
    variables: {
      authorId: String(ProfileData?.getProfile?.id),
      limit: 5,
      offset: 0,
    },
  });

  useEffect(() => {
    if (ProfileData) {
      const { getProfile } = ProfileData;

      if (getProfile?.username === loggedInUser?.username) {
        setIsMyProfile(true);
      } else {
        setIsMyProfile(false);
      }
    }
  }, [ProfileData, loggedInUser]);

  if (ProfileLoading || ProfilePostLoading)
    return <Loading justifycontent="center" />;

  if (ProfileData.getProfile === null) {
    return (
      <ContentError
        margin="0px auto"
        content="Oops.. Username not found"
        imgUrl="/image/_error.png"
      />
    );
  }
  if (ProfileError || ProfilePostError) {
    return (
      <ContentError
        margin="0px auto"
        content="Oops.. Something went wrong"
        imgUrl="/image/_error.png"
      />
    );
  }

  // assign it into constant
  const userProfile = ProfileData?.getProfile;
  const userPosts = ProfilePostData?.getProfilePost;

  return (
    <Container>
      <SEO
        title={`${userProfile.name} (@${userProfile.username})`}
        // og description from biodata
        description={`${username}"`}
      />
      UserProfile
      {userProfile.username}
      <div>
        <AvatarImage
          src={userProfile.avatarUrl}
          width={90}
          height={90}
          alt="avatar"
        />
      </div>
      {isMyProfile && <button>Edit Profile</button>}
      {userPosts?.map((post) => {
        return (
          <PostCard key={post.id}>
            <p>{post.content}</p>
          </PostCard>
        );
      })}
    </Container>
  );
};

export default UserProfile;
