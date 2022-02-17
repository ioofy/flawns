import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Account = {
  __typename?: "Account";
  id: Scalars["ID"];
  providerId: Scalars["String"];
  providerType: Scalars["String"];
  user: User;
};

export type ActivationAccountPayload = {
  __typename?: "ActivationAccountPayload";
  user?: Maybe<User>;
  userErrors: Array<UserError>;
};

export type AuthPayload = {
  __typename?: "AuthPayload";
  account?: Maybe<Account>;
  token?: Maybe<Scalars["String"]>;
  userErrors: Array<UserError>;
};

export type CheckPayload = {
  __typename?: "CheckPayload";
  userErrors: Array<UserError>;
};

export type Comment = {
  __typename?: "Comment";
  createdAt?: Maybe<Scalars["Date"]>;
  id: Scalars["Int"];
  text: Scalars["String"];
  user: User;
};

export type CommentInput = {
  postId?: InputMaybe<Scalars["Int"]>;
  text?: InputMaybe<Scalars["String"]>;
};

export type CommentPayload = {
  __typename?: "CommentPayload";
  comment?: Maybe<Comment>;
  userErrors: Array<UserError>;
};

export type CredentialsInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type FollowUserResult = {
  __typename?: "FollowUserResult";
  message: Scalars["String"];
  ok: Scalars["Boolean"];
};

export type LikePostPayload = {
  __typename?: "LikePostPayload";
  likes?: Maybe<LikedPost>;
  userErrors: Array<UserError>;
};

export type LikedPost = {
  __typename?: "LikedPost";
  id: Scalars["ID"];
  likedAt: Scalars["String"];
  user: User;
};

export type Mutation = {
  __typename?: "Mutation";
  activationAccount: ActivationAccountPayload;
  checkUsername: CheckPayload;
  commentCreate: CommentPayload;
  followUser: FollowUserResult;
  likesCreate: LikePostPayload;
  postCreate: PostPayload;
  postDelete: PostPayload;
  postPublished: PostPayload;
  postUnPublished: PostPayload;
  postUpdate: PostPayload;
  professionCreate: ProfessionPayload;
  professionDelete: ProfessionPayload;
  signin: AuthPayload;
  signup: AuthPayload;
  unfollowUser: UnfollowUserResult;
};

export type MutationActivationAccountArgs = {
  emailAccount: Scalars["String"];
  tokenAccount: Scalars["String"];
};

export type MutationCheckUsernameArgs = {
  username: Scalars["String"];
};

export type MutationCommentCreateArgs = {
  comment: CommentInput;
};

export type MutationFollowUserArgs = {
  username: Scalars["String"];
};

export type MutationLikesCreateArgs = {
  postId: Scalars["ID"];
};

export type MutationPostCreateArgs = {
  post: PostInput;
};

export type MutationPostDeleteArgs = {
  postId: Scalars["ID"];
};

export type MutationPostPublishedArgs = {
  postId: Scalars["ID"];
};

export type MutationPostUnPublishedArgs = {
  postId: Scalars["ID"];
};

export type MutationPostUpdateArgs = {
  post: PostInput;
  postId: Scalars["ID"];
};

export type MutationProfessionCreateArgs = {
  profession: ProfessionInput;
};

export type MutationProfessionDeleteArgs = {
  professionId: Scalars["ID"];
};

export type MutationSigninArgs = {
  credentials: CredentialsInput;
};

export type MutationSignupArgs = {
  credentials: CredentialsInput;
  name: Scalars["String"];
  secretToken: Scalars["String"];
  username: Scalars["String"];
};

export type MutationUnfollowUserArgs = {
  username: Scalars["String"];
};

export type Post = {
  __typename?: "Post";
  comments: Array<Maybe<Comment>>;
  content: Scalars["String"];
  createdAt?: Maybe<Scalars["Date"]>;
  id: Scalars["ID"];
  likes: Array<Maybe<LikedPost>>;
  published: Scalars["Boolean"];
  user: User;
};

export type PostInput = {
  content?: InputMaybe<Scalars["String"]>;
};

export type PostPayload = {
  __typename?: "PostPayload";
  post?: Maybe<Post>;
  userErrors: Array<UserError>;
};

export type Profession = {
  __typename?: "Profession";
  id: Scalars["ID"];
  role: Scalars["String"];
  user: User;
};

export type ProfessionInput = {
  role?: InputMaybe<Scalars["String"]>;
};

export type ProfessionPayload = {
  __typename?: "ProfessionPayload";
  profession?: Maybe<Profession>;
  userErrors: Array<UserError>;
};

export type Profile = {
  __typename?: "Profile";
  user: User;
};

export type Query = {
  __typename?: "Query";
  comments: Array<Maybe<Comment>>;
  getPost?: Maybe<Post>;
  getProfile?: Maybe<User>;
  me?: Maybe<User>;
  posts: Array<Maybe<Post>>;
  status: Scalars["String"];
};

export type QueryCommentsArgs = {
  limit: Scalars["Int"];
  offset: Scalars["Int"];
  postId: Scalars["ID"];
};

export type QueryGetPostArgs = {
  postId: Scalars["ID"];
};

export type QueryGetProfileArgs = {
  username: Scalars["String"];
};

export type QueryPostsArgs = {
  limit: Scalars["Int"];
  offset: Scalars["Int"];
};

export type UnfollowUserResult = {
  __typename?: "UnfollowUserResult";
  message: Scalars["String"];
  ok: Scalars["Boolean"];
};

export type User = {
  __typename?: "User";
  avatarUrl?: Maybe<Scalars["String"]>;
  bio: Scalars["String"];
  email?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  isMyProfile: Scalars["Boolean"];
  isVerified: Scalars["Boolean"];
  name: Scalars["String"];
  posts: Array<Maybe<Post>>;
  profession: Array<Profession>;
  slug: Scalars["String"];
  token: Scalars["String"];
  username: Scalars["String"];
};

export type UserError = {
  __typename?: "UserError";
  message: Scalars["String"];
};

export type ActivateAccountMutationVariables = Exact<{
  emailAccount: Scalars["String"];
  tokenAccount: Scalars["String"];
}>;

export type ActivateAccountMutation = {
  __typename?: "Mutation";
  activationAccount: {
    __typename?: "ActivationAccountPayload";
    userErrors: Array<{ __typename?: "UserError"; message: string }>;
  };
};

export type CheckUsernameMutationVariables = Exact<{
  username: Scalars["String"];
}>;

export type CheckUsernameMutation = {
  __typename?: "Mutation";
  checkUsername: {
    __typename?: "CheckPayload";
    userErrors: Array<{ __typename?: "UserError"; message: string }>;
  };
};

export type CommentsQueryVariables = Exact<{
  offset: Scalars["Int"];
  limit: Scalars["Int"];
  postId: Scalars["ID"];
}>;

export type CommentsQuery = {
  __typename?: "Query";
  comments: Array<
    | {
        __typename: "Comment";
        id: number;
        text: string;
        createdAt?: any | null | undefined;
        user: {
          __typename?: "User";
          avatarUrl?: string | null | undefined;
          name: string;
          username: string;
        };
      }
    | null
    | undefined
  >;
};

export type GetPostQueryVariables = Exact<{
  postId: Scalars["ID"];
}>;

export type GetPostQuery = {
  __typename?: "Query";
  getPost?:
    | {
        __typename?: "Post";
        content: string;
        createdAt?: any | null | undefined;
        likes: Array<
          { __typename?: "LikedPost"; id: string } | null | undefined
        >;
        comments: Array<
          | {
              __typename?: "Comment";
              id: number;
              user: {
                __typename?: "User";
                avatarUrl?: string | null | undefined;
                name: string;
                username: string;
              };
            }
          | null
          | undefined
        >;
        user: {
          __typename?: "User";
          avatarUrl?: string | null | undefined;
          name: string;
          username: string;
        };
      }
    | null
    | undefined;
};

export type GetProfileQueryVariables = Exact<{
  username: Scalars["String"];
}>;

export type GetProfileQuery = {
  __typename?: "Query";
  getProfile?:
    | {
        __typename?: "User";
        username: string;
        name: string;
        isMyProfile: boolean;
        posts: Array<
          | {
              __typename?: "Post";
              id: string;
              content: string;
              comments: Array<
                | {
                    __typename?: "Comment";
                    id: number;
                    user: {
                      __typename?: "User";
                      avatarUrl?: string | null | undefined;
                      name: string;
                      username: string;
                    };
                  }
                | null
                | undefined
              >;
            }
          | null
          | undefined
        >;
      }
    | null
    | undefined;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me?: { __typename?: "User"; name: string; token: string } | null | undefined;
};

export type PostQueryVariables = Exact<{
  offset: Scalars["Int"];
  limit: Scalars["Int"];
}>;

export type PostQuery = {
  __typename?: "Query";
  posts: Array<
    | {
        __typename?: "Post";
        id: string;
        content: string;
        createdAt?: any | null | undefined;
        user: {
          __typename?: "User";
          avatarUrl?: string | null | undefined;
          username: string;
          id: string;
          name: string;
        };
        likes: Array<
          | {
              __typename?: "LikedPost";
              id: string;
              user: {
                __typename?: "User";
                avatarUrl?: string | null | undefined;
                name: string;
              };
            }
          | null
          | undefined
        >;
        comments: Array<
          | {
              __typename?: "Comment";
              user: {
                __typename?: "User";
                avatarUrl?: string | null | undefined;
                name: string;
                username: string;
              };
            }
          | null
          | undefined
        >;
      }
    | null
    | undefined
  >;
};

export type SigninMutationVariables = Exact<{
  credentials: CredentialsInput;
}>;

export type SigninMutation = {
  __typename?: "Mutation";
  signin: {
    __typename?: "AuthPayload";
    token?: string | null | undefined;
    userErrors: Array<{ __typename?: "UserError"; message: string }>;
  };
};

export type SignupMutationVariables = Exact<{
  secretToken: Scalars["String"];
  name: Scalars["String"];
  username: Scalars["String"];
  credentials: CredentialsInput;
}>;

export type SignupMutation = {
  __typename?: "Mutation";
  signup: {
    __typename?: "AuthPayload";
    token?: string | null | undefined;
    userErrors: Array<{ __typename?: "UserError"; message: string }>;
  };
};

export const ActivateAccountDocument = gql`
  mutation activateAccount($emailAccount: String!, $tokenAccount: String!) {
    activationAccount(
      emailAccount: $emailAccount
      tokenAccount: $tokenAccount
    ) {
      userErrors {
        message
      }
    }
  }
`;
export type ActivateAccountMutationFn = Apollo.MutationFunction<
  ActivateAccountMutation,
  ActivateAccountMutationVariables
>;

/**
 * __useActivateAccountMutation__
 *
 * To run a mutation, you first call `useActivateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activateAccountMutation, { data, loading, error }] = useActivateAccountMutation({
 *   variables: {
 *      emailAccount: // value for 'emailAccount'
 *      tokenAccount: // value for 'tokenAccount'
 *   },
 * });
 */
export function useActivateAccountMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ActivateAccountMutation,
    ActivateAccountMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ActivateAccountMutation,
    ActivateAccountMutationVariables
  >(ActivateAccountDocument, options);
}
export type ActivateAccountMutationHookResult = ReturnType<
  typeof useActivateAccountMutation
>;
export type ActivateAccountMutationResult =
  Apollo.MutationResult<ActivateAccountMutation>;
export type ActivateAccountMutationOptions = Apollo.BaseMutationOptions<
  ActivateAccountMutation,
  ActivateAccountMutationVariables
>;
export const CheckUsernameDocument = gql`
  mutation checkUsername($username: String!) {
    checkUsername(username: $username) {
      userErrors {
        message
      }
    }
  }
`;
export type CheckUsernameMutationFn = Apollo.MutationFunction<
  CheckUsernameMutation,
  CheckUsernameMutationVariables
>;

/**
 * __useCheckUsernameMutation__
 *
 * To run a mutation, you first call `useCheckUsernameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckUsernameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkUsernameMutation, { data, loading, error }] = useCheckUsernameMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useCheckUsernameMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CheckUsernameMutation,
    CheckUsernameMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CheckUsernameMutation,
    CheckUsernameMutationVariables
  >(CheckUsernameDocument, options);
}
export type CheckUsernameMutationHookResult = ReturnType<
  typeof useCheckUsernameMutation
>;
export type CheckUsernameMutationResult =
  Apollo.MutationResult<CheckUsernameMutation>;
export type CheckUsernameMutationOptions = Apollo.BaseMutationOptions<
  CheckUsernameMutation,
  CheckUsernameMutationVariables
>;
export const CommentsDocument = gql`
  query comments($offset: Int!, $limit: Int!, $postId: ID!) {
    comments(limit: $limit, offset: $offset, postId: $postId) {
      id
      __typename
      text
      createdAt
      user {
        avatarUrl
        name
        username
      }
    }
  }
`;

/**
 * __useCommentsQuery__
 *
 * To run a query within a React component, call `useCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentsQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useCommentsQuery(
  baseOptions: Apollo.QueryHookOptions<CommentsQuery, CommentsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CommentsQuery, CommentsQueryVariables>(
    CommentsDocument,
    options
  );
}
export function useCommentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CommentsQuery,
    CommentsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CommentsQuery, CommentsQueryVariables>(
    CommentsDocument,
    options
  );
}
export type CommentsQueryHookResult = ReturnType<typeof useCommentsQuery>;
export type CommentsLazyQueryHookResult = ReturnType<
  typeof useCommentsLazyQuery
>;
export type CommentsQueryResult = Apollo.QueryResult<
  CommentsQuery,
  CommentsQueryVariables
>;
export const GetPostDocument = gql`
  query getPost($postId: ID!) {
    getPost(postId: $postId) {
      content
      createdAt
      likes {
        id
      }
      comments {
        id
        user {
          avatarUrl
          name
          username
        }
      }
      user {
        avatarUrl
        name
        username
      }
    }
  }
`;

/**
 * __useGetPostQuery__
 *
 * To run a query within a React component, call `useGetPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useGetPostQuery(
  baseOptions: Apollo.QueryHookOptions<GetPostQuery, GetPostQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPostQuery, GetPostQueryVariables>(
    GetPostDocument,
    options
  );
}
export function useGetPostLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPostQuery, GetPostQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetPostQuery, GetPostQueryVariables>(
    GetPostDocument,
    options
  );
}
export type GetPostQueryHookResult = ReturnType<typeof useGetPostQuery>;
export type GetPostLazyQueryHookResult = ReturnType<typeof useGetPostLazyQuery>;
export type GetPostQueryResult = Apollo.QueryResult<
  GetPostQuery,
  GetPostQueryVariables
>;
export const GetProfileDocument = gql`
  query getProfile($username: String!) {
    getProfile(username: $username) {
      username
      name
      isMyProfile
      posts {
        id
        content
        comments {
          id
          user {
            avatarUrl
            name
            username
          }
        }
      }
    }
  }
`;

/**
 * __useGetProfileQuery__
 *
 * To run a query within a React component, call `useGetProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useGetProfileQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetProfileQuery,
    GetProfileQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetProfileQuery, GetProfileQueryVariables>(
    GetProfileDocument,
    options
  );
}
export function useGetProfileLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetProfileQuery,
    GetProfileQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetProfileQuery, GetProfileQueryVariables>(
    GetProfileDocument,
    options
  );
}
export type GetProfileQueryHookResult = ReturnType<typeof useGetProfileQuery>;
export type GetProfileLazyQueryHookResult = ReturnType<
  typeof useGetProfileLazyQuery
>;
export type GetProfileQueryResult = Apollo.QueryResult<
  GetProfileQuery,
  GetProfileQueryVariables
>;
export const MeDocument = gql`
  query me {
    me {
      name
      token
    }
  }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const PostDocument = gql`
  query Post($offset: Int!, $limit: Int!) {
    posts: posts(offset: $offset, limit: $limit) {
      id
      content
      createdAt
      user {
        avatarUrl
        username
        id
        name
      }
      likes {
        user {
          avatarUrl
          name
        }
        id
      }
      comments {
        user {
          avatarUrl
          name
          username
        }
      }
    }
  }
`;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function usePostQuery(
  baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
}
export function usePostLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(
    PostDocument,
    options
  );
}
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export const SigninDocument = gql`
  mutation signin($credentials: CredentialsInput!) {
    signin(credentials: $credentials) {
      userErrors {
        message
      }
      token
    }
  }
`;
export type SigninMutationFn = Apollo.MutationFunction<
  SigninMutation,
  SigninMutationVariables
>;

/**
 * __useSigninMutation__
 *
 * To run a mutation, you first call `useSigninMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSigninMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signinMutation, { data, loading, error }] = useSigninMutation({
 *   variables: {
 *      credentials: // value for 'credentials'
 *   },
 * });
 */
export function useSigninMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SigninMutation,
    SigninMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SigninMutation, SigninMutationVariables>(
    SigninDocument,
    options
  );
}
export type SigninMutationHookResult = ReturnType<typeof useSigninMutation>;
export type SigninMutationResult = Apollo.MutationResult<SigninMutation>;
export type SigninMutationOptions = Apollo.BaseMutationOptions<
  SigninMutation,
  SigninMutationVariables
>;
export const SignupDocument = gql`
  mutation signup(
    $secretToken: String!
    $name: String!
    $username: String!
    $credentials: CredentialsInput!
  ) {
    signup(
      secretToken: $secretToken
      name: $name
      username: $username
      credentials: $credentials
    ) {
      userErrors {
        message
      }
      token
    }
  }
`;
export type SignupMutationFn = Apollo.MutationFunction<
  SignupMutation,
  SignupMutationVariables
>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      secretToken: // value for 'secretToken'
 *      name: // value for 'name'
 *      username: // value for 'username'
 *      credentials: // value for 'credentials'
 *   },
 * });
 */
export function useSignupMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignupMutation,
    SignupMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignupMutation, SignupMutationVariables>(
    SignupDocument,
    options
  );
}
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<
  SignupMutation,
  SignupMutationVariables
>;
