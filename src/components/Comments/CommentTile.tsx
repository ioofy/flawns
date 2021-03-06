import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { animateCommentItem } from "@animations/index";
import { useGetSubCommentsQuery } from "generated/graphql";
import { SUBCOMMENT_SUBSCRIPTION } from "@graphql/Subscription/comments-subs";
import { ButtonDelete as ButtonSubCommentDelete } from "./SubComment/components/ButtonDelete";
import Avatar from "@components/Avatars/Avatar";
import Loading from "@components/Loadings/Loading";
import IntoNow from "@components/Moments/IntoNow";
import styled from "styled-components";
import CommentSubForm from "./SubComment/CommentSubForm";

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
  /* width: 370px; */
  background-color: pink;
  margin: 10px 0;
  padding: 20px;
  font-family: "AllianceM";
  font-size: 15px;
  /* min-width: 200px; */
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

const CommentTile = ({ comment }: CommentTileProps) => {
  const {
    id: commentId,
    date,
    text,
    user: { id, name, username },
  } = comment;

  const { data, error, subscribeToMore, fetchMore, loading, refetch } =
    useGetSubCommentsQuery({
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
    <CommentBox>
      <Avatar altText={username} userId={id} />
      <p>
        on <IntoNow actualDate={date} interval={1000} />
      </p>
      <p>
        By: {name} - {username}
      </p>
      <p>{text}</p>
      {loading ? (
        <Loading justifycontent="center" />
      ) : (
        <AnimatePresence>
          {data &&
            data.getSubComments.subComments &&
            data.getSubComments.subComments.map((subComment) => {
              return (
                <motion.div key={subComment.id} layout {...animateCommentItem}>
                  <ButtonSubCommentDelete
                    username={subComment.user.username}
                    subCommentId={subComment.id}
                    commentId={commentId}
                    onDeleted={refetch}
                  />
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
      )}

      {hasMore && (
        <div className="more-button">
          <button onClick={() => handleMore()}>
            {isLoading ? <Loading justifycontent="center" /> : "Load More"}
          </button>
        </div>
      )}
      <CommentSubForm commentId={commentId} username={username} />
    </CommentBox>
  );
};

export default CommentTile;
