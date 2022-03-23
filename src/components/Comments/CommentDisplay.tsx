import React, { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { useGetCommentsQuery } from "generated/graphql";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import CommentTile from "./CommentTile";
import Loading from "@components/Loadings/Loading";
import CommentForm from "./CommentForm";
import { animateCommentItem } from "src/animations";

const Wrapper = styled.div`
  width: 100%;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 370px;
`;

const COMMENT_SUBSCRIPTION = gql`
  subscription commentCreated($postId: ID!) {
    commentCreated(postId: $postId) {
      id
      text
      date
      user {
        id
        name
        username
      }
      subComments {
        id
      }
    }
  }
`;

const CommentDisplay = () => {
  const router = useRouter();
  const { id } = router.query;

  const [isLoading, setLoading] = useState(false);
  const { data, loading, fetchMore, subscribeToMore, error } =
    useGetCommentsQuery({
      variables: {
        postId: String(id),
        pageSize: 7,
      },
    });

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
      <ContentWrapper>
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
                        {/* DELETE BUTTON */}
                        {/* <button
                          onClick={() => {
                            console.log("delete!");
                          }}
                        >
                          <BiTrash size={20} style={{ cursor: "pointer" }} />
                        </button> */}

                        <CommentTile comment={comment} />
                      </motion.div>
                    );
                  }
                )}
            </AnimatePresence>
            {hasMore && (
              <div className="more-button">
                <button onClick={() => handleMore()}>
                  {isLoading ? (
                    <Loading justifycontent="center" />
                  ) : (
                    "Load More"
                  )}
                </button>
              </div>
            )}
            {hasMore === false && (
              <p style={{ margin: "10px 0px" }}>😞No more Comments</p>
            )}
          </Wrapper>
        )}
      </ContentWrapper>
    </>
  );
};

export default CommentDisplay;
