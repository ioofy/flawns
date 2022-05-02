import React, { useEffect, useState, useContext } from "react";
import { useSubscription } from "@apollo/client";
import { useRouter } from "next/router";
import { animateCommentItem } from "src/animations";
import { useGetCommentsQuery } from "generated/graphql";
import { AnimatePresence, motion } from "framer-motion";
import { COMMENT_SUBSCRIPTION } from "@graphql/Subscription/comments-subs";
import { NotifContext } from "@context/NotifContextProvider";
import { ButtonDelete as ButtonCommentDelete } from "./components/ButtonDelete";
import styled from "styled-components";
import CommentTile from "../CommentTile";
import Loading from "@components/Loadings/Loading";
import CommentForm from "./CommentForm";

const Wrapper = styled.div`
  max-width: 100%;
`;

const ContentWrapper = styled.div``;

const CommentDisplay = () => {
  const router = useRouter();
  const { id } = router.query;
  const { setDataCommentNotif } = useContext(NotifContext);

  const postId = String(id);

  const [isLoading, setLoading] = useState(false);
  const { data, loading, fetchMore, subscribeToMore, error, refetch } =
    useGetCommentsQuery({
      variables: {
        postId,
        pageSize: 7,
      },
    });

  const { data: commentsData } = useSubscription(COMMENT_SUBSCRIPTION, {
    variables: {
      postId,
    },
  });

  useEffect(() => {
    const notifComments = commentsData?.commentCreated;

    if (notifComments) {
      setDataCommentNotif((comment: any) => [...comment, notifComments]);
    }
  }, [commentsData, setDataCommentNotif]);

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: COMMENT_SUBSCRIPTION,
      variables: {
        postId: String(id),
      },

      updateQuery: (prev: any, { subscriptionData }: any) => {
        if (!subscriptionData.data) return prev;

        const subscriptionResponse = subscriptionData.data.commentCreated;

        const newCache = Object.assign({}, prev, {
          getComments: {
            hasMore: prev.getComments.hasMore,
            cursor: prev.getComments.cursor,
            comments: [subscriptionResponse, ...prev.getComments.comments],
          },
        });

        return newCache;
      },
    });

    return () => {
      unsubscribe();
    };
  }, [subscribeToMore, id]);

  if (error) return <p>error</p>;

  const handleMore = () => {
    fetchMore({
      variables: {
        postId: String(id),
        after: data.getComments.cursor,
      },
    });

    // set it loading
    setLoading(true);

    // and clean up after 1 seconds
    setTimeout(function () {
      setLoading(false);
    }, 800);
  };

  const hasMore = data?.getComments.hasMore;

  return (
    <>
      <CommentForm />

      {loading ? (
        <Loading justifycontent="center" />
      ) : (
        <Wrapper>
          <AnimatePresence>
            {data &&
              data.getComments.comments &&
              data.getComments.comments.map(
                (commentItem: any, index: number) => {
                  const comment = data.getComments.comments[index];

                  return (
                    <motion.div
                      key={commentItem.id}
                      layout
                      {...animateCommentItem}
                    >
                      <ContentWrapper>
                        <ButtonCommentDelete
                          commentId={comment.id}
                          username={comment.user.username}
                          postId={postId}
                          onDeleted={refetch}
                        />
                        <CommentTile comment={comment} />
                      </ContentWrapper>
                    </motion.div>
                  );
                }
              )}
          </AnimatePresence>
          {hasMore && (
            <div className="more-button">
              <button onClick={() => handleMore()}>
                {isLoading ? <Loading justifycontent="center" /> : "Load More"}
              </button>
            </div>
          )}
          {hasMore === false && (
            <p style={{ margin: "10px 0px" }}>😞No more Comments</p>
          )}
        </Wrapper>
      )}
    </>
  );
};

export default CommentDisplay;
