import React, { useContext, useEffect, useState } from "react";
import { ContentErrors } from "@components/CustomError/Error";
import { Container } from "@styles/global.styles";
import { useGetProfilePostQuery, useGetProfileQuery } from "generated/graphql";
import { useRouter } from "next/router";
import { AuthContext } from "@context/AuthContextProvider";
import { BiEdit } from "react-icons/bi";
import Image from "next/image";
import Loading from "@components/Loadings/Loading";
import SEO from "@components/Metadata/SEO";
import styled from "styled-components";
import dynamic from "next/dynamic";
import ModalProfile from "@components/Modals/ModalProfile";
import Link from "next/link";
import IntoNow from "@components/Moments/IntoNow";
import Avatar from "@components/Avatars/Avatar";

// ssr false
const AvatarUpload = dynamic(() => import("@components/Avatars/AvatarUpload"), {
  ssr: false,
});

const PostCard = styled.div`
  padding: 10px;
  height: 370px;
  background-color: pink;
  width: 320px;
  margin: 20px 0px;

  @media screen and (max-width: 280px) {
    width: 100%;
  }
`;

const AvatarContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const AvatarImage = styled(Image)`
  cursor: pointer;
  border-radius: 99px;
  border: 2px solid pink !important;
`;

const AvatarShow = styled.img`
  @media screen and (max-width: 280px) {
    width: 100%;
    padding: 10px;
  }
`;

const UserProfile = () => {
  const router = useRouter();
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);
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

  if (ProfileLoading) return <Loading justifycontent="center" />;

  if (ProfileData.getProfile === null) {
    return (
      <>
        <SEO
          title="Oops.. user not found"
          description="Oops.. user not found"
        />
        <ContentErrors
          margin="0px auto"
          content="Oops.. Username not found"
          imgUrl="/image/_error.png"
        />
      </>
    );
  }
  if (ProfileError || ProfilePostError) {
    return (
      <>
        <SEO
          title="Oops.. Something went wrong"
          description="Oops.. Something went wrong"
        />
        <ContentErrors
          margin="0px auto"
          content="Oops.. Something went wrong"
          imgUrl="/image/_error.png"
        />
      </>
    );
  }

  // assign it into constant
  const userProfile = ProfileData?.getProfile;
  const userPosts = ProfilePostData?.getProfilePost;

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const openAvatarModal = () => {
    setShowAvatar((prev) => !prev);
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
      <ModalProfile
        isShowing={showModal}
        setShowModal={setShowModal}
        customWidth="1300px"
        customHeight="550px"
        customBg="#fff"
        customBorder="10px"
      >
        <AvatarUpload />
      </ModalProfile>
      <div>
        <AvatarContainer>
          <AvatarImage
            src={userProfile.avatarUrl}
            width={120}
            height={120}
            objectFit="contain"
            blurDataURL="1"
            placeholder="blur"
            priority
            alt={userProfile.name}
            onClick={openAvatarModal}
          />
        </AvatarContainer>
        {isMyProfile && (
          <BiEdit size={22} className="icon" onClick={openModal} />
        )}
      </div>
      <ModalProfile
        isShowing={showAvatar}
        setShowModal={setShowAvatar}
        customHeight="100%"
        customWidth="100%"
        customBg="#2889ca8b"
        customBorder="0px"
      >
        <AvatarShow src={userProfile.avatarUrl} alt={userProfile.name} />
      </ModalProfile>
      {userProfile.bio ? (
        <p>{userProfile.bio}</p>
      ) : (
        <p>This user didnt create a bio yet</p>
      )}
      {ProfilePostLoading ? (
        <Loading justifycontent="start" />
      ) : (
        userPosts?.map((post) => {
          return (
            <Link
              key={post.id}
              href={`/${userProfile.username}/status/${post?.id}`}
            >
              <PostCard>
                <Avatar
                  userId={userProfile.id}
                  altText={userProfile.username}
                  height={45}
                  width={45}
                />
                <p>
                  {userProfile.name} - @{username}
                  · <IntoNow actualDate={post.createdAt} interval={1000} />
                </p>
                <p>{post.content}</p>
              </PostCard>
            </Link>
          );
        })
      )}
    </Container>
  );
};

export default UserProfile;
