import React, { useContext, useEffect, useState } from "react";
import { ContentErrors } from "@components/CustomError/Error";
import { Container } from "@styles/global.styles";
import { useGetProfilePostQuery, useGetProfileQuery } from "generated/graphql";
import { useRouter } from "next/router";
import { AuthContext } from "@context/AuthContextProvider";
import { toast, Toaster } from "react-hot-toast";
// import image from "next/image";
import Loading from "@components/Loadings/Loading";
import SEO from "@components/Metadata/SEO";
import styled from "styled-components";
import dynamic from "next/dynamic";
import ModalProfile from "@components/Modals/ModalProfile";
import ModalEdit from "@components/Modals/ModalEdit";
import Link from "next/link";
import IntoNow from "@components/Moments/IntoNow";
import Avatar from "@components/Avatars/Avatar";
import ButtonUpload from "@components/Buttons/ButtonUpload";

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
  max-width: 130px;

  .__wrapper {
    .__avatar {
      z-index: 9 !important;
    }
  }
`;

const AvatarImage = styled.img<AvatarProps>`
  cursor: ${(props) => props.cursor};
  border-radius: 9999px;
  width: 100%;
`;

const AvatarShow = styled.img`
  width: 450px;
  border-radius: 999px;

  @media screen and (max-width: 428px) {
    width: 95%;
    padding: 10px;
  }
`;

const WrapperCanvas = styled.div`
  position: relative;
  z-index: 99999;
`;

type AvatarProps = {
  cursor: string;
};

const UserProfile = () => {
  const router = useRouter();
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);
  const [showCanvasEdit, setShowCanvasEdit] = useState(false);
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

  if (ProfileData?.getProfile === null) {
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

  // show modal update profile
  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  // show modal avatar profile
  const openAvatarModal = () => {
    setShowAvatar((prev) => !prev);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files[0];

    if (files) {
      const img = new Image();

      img.src = URL.createObjectURL(e.target.files[0]);

      img.onload = () => {
        const { width } = img;

        if (width > 2560) {
          toast.error("Image size is too big");
          return false;
        }

        if (files.size > 1100000) {
          toast.error("File size is too big, please upload less than 1mb");
        } else {
          const setBlob = URL.createObjectURL(files);
          setAvatar(setBlob);

          setShowCanvasEdit(true);
          console.log(files);
        }
      };
    }
  };

  const AvatarEditCanvas = () => {
    return (
      <WrapperCanvas>
        <ModalProfile
          isShowing={showCanvasEdit}
          setShowModal={setShowCanvasEdit}
          customWidth="800px"
          customHeight="650px"
          customBg="#fff"
          customBorder="10px"
        >
          <AvatarUpload
            avatarUrl={avatar}
            onClick={() => setShowCanvasEdit(false)}
          />
        </ModalProfile>
      </WrapperCanvas>
    );
  };

  return (
    <Container>
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerClassName="toaster"
      />
      <SEO
        title={`${userProfile.name} (@${userProfile.username})`}
        // og description from biodata
        description={`${username}"`}
      />
      UserProfile
      <p>
        {userProfile.username} - {userProfile.name}
      </p>
      <AvatarEditCanvas />
      {/* Modal Avatar */}
      <ModalEdit
        isShowing={showModal}
        setShowModal={setShowModal}
        customWidth="800px"
        customHeight="650px"
        customBg="#fff"
        customBorder="10px"
      >
        <AvatarContainer>
          <div className="__wrapper">
            <AvatarImage
              src={userProfile.avatarUrl}
              cursor="default"
              alt={userProfile.name}
              className="__avatar"
            />
            <ButtonUpload onChange={handleChange} />
          </div>
        </AvatarContainer>
      </ModalEdit>
      {/* Avatar*/}
      <div>
        <AvatarContainer>
          <AvatarImage
            src={userProfile.avatarUrl}
            cursor="pointer"
            alt={userProfile.name}
            onClick={openAvatarModal}
          />
        </AvatarContainer>
        {isMyProfile && (
          <button style={{ margin: "20px 0" }} onClick={openModal}>
            Edit Profile
          </button>
        )}
      </div>
      {/* Modal Profile */}
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
      <p>
        {userProfile.followers.length} Followers -{" "}
        {userProfile.following.length} Following
      </p>
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
