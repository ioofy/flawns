import React, { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { useGetCommentsQuery } from "generated/graphql";
import { useRouter } from "next/router";
import styled from "styled-components";
import CommentTile from "./CommentTile";
import Loading from "@components/Loadings/Loading";

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
            count: prev.getComments.count,
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
    <ContentWrapper>
      {loading ? (
        <Loading justifycontent="center" />
      ) : (
        <Wrapper onScroll={handleMore}>
          {data &&
            data.getComments.comments &&
            data.getComments.comments.map((commentItem: any, index: number) => {
              const comment = data.getComments.comments[index];

              if (comment) {
                return <CommentTile comment={comment} key={commentItem.id} />;
              }

              return null;
            })}
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
    </ContentWrapper>
  );
};

export default CommentDisplay;
