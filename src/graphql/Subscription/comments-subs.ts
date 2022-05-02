import { gql } from "@apollo/client";

export const COMMENT_SUBSCRIPTION = gql`
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

export const SUBCOMMENT_SUBSCRIPTION = gql`
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
