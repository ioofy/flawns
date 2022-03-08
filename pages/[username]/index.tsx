import React, { useContext, useEffect, useState } from "react";
import { ContentErrors } from "@components/CustomError/Error";
import { Container } from "@styles/global.styles";
import { useGetProfilePostQuery, useGetProfileQuery } from "generated/graphql";
import { useRouter } from "next/router";
import { AuthContext } from "@context/AuthContextProvider";
import { BiEdit } from "react-icons/bi";
import Loading from "@components/Loadings/Loading";
import SEO from "@components/Metadata/SEO";
import Image from "next/image";
import styled from "styled-components";
import dynamic from "next/dynamic";
import ModalProfile from "@components/Modals/ModalProfile";

// ssr false
const AvatarUpload = dynamic(() => import("@components/Avatar/AvatarUpload"), {
  ssr: false,
});

const PostCard = styled.div`
  padding: 10px;
  height: 370px;
  background-color: pink;
  width: 320px;
  margin: 20px 0px;
`;

const AvatarImage = styled(Image)`
  border-radius: 99px;
  height: 100%;
  width: 100%;
`;

const UserProfile = () => {
  const router = useRouter();
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
      <ContentErrors
        margin="0px auto"
        content="Oops.. Username not found"
        imgUrl="/image/_error.png"
      />
    );
  }
  if (ProfileError || ProfilePostError) {
    return (
      <ContentErrors
        margin="0px auto"
        content="Oops.. Something went wrong"
        imgUrl="/image/_error.png"
      />
    );
  }

  // assign it into constant
  const userProfile = ProfileData?.getProfile;
  const userPosts = ProfilePostData?.getProfilePost;

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <Container>
      <SEO
        title={`${userProfile.name} (@${userProfile.username})`}
        // og description from biodata
        description={`${username}"`}
      />
      UserProfile
      <p>
        {userProfile.username} - {userProfile.name}
      </p>
      <ModalProfile isShowing={showModal} setShowModal={setShowModal}>
        <AvatarUpload />
      </ModalProfile>
      <div>
        <AvatarImage
          src={userProfile.avatarUrl}
          width={100}
          height={100}
          objectFit="contain"
          quality={100}
          blurDataURL="1"
          placeholder="blur"
          priority
        />
        {isMyProfile && (
          <BiEdit size={22} className="icon" onClick={openModal} />
        )}
      </div>
      {userProfile.bio ? (
        <p>{userProfile.bio}</p>
      ) : (
        <p>This user didnt create a bio yet</p>
      )}
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
