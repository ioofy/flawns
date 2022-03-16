import React, { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { AnimatePresence, motion } from "framer-motion";
import { useGetSubCommentsQuery } from "generated/graphql";
import Avatar from "@components/Avatars/Avatar";
import Loading from "@components/Loadings/Loading";
import IntoNow from "@components/Moments/IntoNow";
import styled from "styled-components";
import CommentSubForm from "./CommentSubForm";

type CommentTileProps = {
  comment: {
    __typename?: "Comment";
    id: string;
    text: string;
    date?: any;
    user: {
      __typename?: "User";
      id: string;
      name: string;
      username?: string;
    };
  };
};

const CommentBox = styled.div`
  width: 370px;
  background-color: pink;
  margin: 10px 0;
  padding: 20px;
  font-family: "AllianceM";
  font-size: 15px;
`;

const SubCommentBox = styled.div`
  width: 330px;
  height: 100%;
  background-color: skyblue;
  margin: 10px 0;
  padding: 20px;
  font-family: "AllianceM";
`;

const SubCommentTile = styled.div`
  padding: 10px;
`;

const PeopleOnComment = styled.div`
  margin: 10px 0;
`;

const animates = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  exit: { scale: 0 },
  // giving transition all ease 0.3
  transition: {
    default: { duration: 0.3, ease: "easeInOut" },
  },
};

const SUBCOMMENT_SUBSCRIPTION = gql`
  subscription ($commentId: Int) {
    subCommentCreated(commentId: $commentId) {
      id
      text
      date
      user {
        id
        name
        username
      }
    }
  }
`;

const CommentTile = ({ comment }: CommentTileProps) => {
  const {
    id: commentId,
    date,
    text,
    user: { id, name, username },
  } = comment;

  const { data, error, subscribeToMore, fetchMore } = useGetSubCommentsQuery({
    variables: {
      commentId,
      pageSize: 1,
    },
  });

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: SUBCOMMENT_SUBSCRIPTION,
      variables: {
        commentId: +commentId,
      },

      updateQuery: (prev: any, { subscriptionData }: any) => {
        if (!subscriptionData.data) return prev;

        const subscriptionResponse = subscriptionData.data.subCommentCreated;

        const newCache = Object.assign({}, prev, {
          getSubComments: {
            hasMore: prev.getSubComments.hasMore,
            cursor: prev.getSubComments.cursor,
            subComments: [
              subscriptionResponse,
              ...prev.getSubComments.subComments,
            ],
          },
        });

        return newCache;
      },
    });

    return () => {
      unsubscribe();
    };
  }, [subscribeToMore, commentId]);

  if (error) return <p>Error</p>;

  const handleMore = () => {
    fetchMore({
      variables: {
        commentId,
        pageSize: 3,
        after: data.getSubComments.cursor,
      },
    });

    // set it loading
    setLoading(true);

    // and clean up after 1 seconds
    setTimeout(function () {
      setLoading(false);
    }, 500);
  };

  const hasMore = data?.getSubComments.hasMore;

  return (
    <>
      <CommentBox>
        <Avatar altText={username} userId={id} />
        <p>
          on <IntoNow actualDate={date} interval={1000} />
        </p>
        <p>
          By: {name} - {username}
        </p>
        <p>{text}</p>

        <AnimatePresence>
          {data &&
            data.getSubComments.subComments &&
            data.getSubComments.subComments.map((subComment) => {
              return (
                <motion.div key={subComment.id} layout {...animates}>
                  <SubCommentBox>
                    <SubCommentTile>
                      <PeopleOnComment>
                        <Avatar
                          altText={subComment.user.username}
                          userId={subComment.user.id}
                        />
                        <p>
                          on{" "}
                          <IntoNow
                            actualDate={subComment.date}
                            interval={1000}
                          />
                        </p>
                        <p>
                          {subComment.user.name} - {subComment.user.username}
                        </p>
                        <p>{subComment.text}</p>
                      </PeopleOnComment>
                    </SubCommentTile>
                  </SubCommentBox>
                </motion.div>
              );
            })}
        </AnimatePresence>
        {hasMore && (
          <div className="more-button">
            <button onClick={() => handleMore()}>
              {isLoading ? <Loading justifycontent="center" /> : "Load More"}
            </button>
          </div>
        )}
        <CommentSubForm commentId={commentId} username={username} />
      </CommentBox>
    </>
  );
};

export default CommentTile;
