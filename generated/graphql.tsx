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
  DateTime: any;
};

export type ActivationAccountPayload = {
  __typename?: "ActivationAccountPayload";
  user?: Maybe<User>;
  userErrors: Array<UserError>;
};

export type AuthPayload = {
  __typename?: "AuthPayload";
  user?: Maybe<User>;
  userErrors: Array<UserError>;
};

export type CheckPayload = {
  __typename?: "CheckPayload";
  userErrors: Array<UserError>;
};

export type Comment = {
  __typename?: "Comment";
  date?: Maybe<Scalars["DateTime"]>;
  id: Scalars["ID"];
  post: Post;
  text: Scalars["String"];
  user: User;
};

export type CommentInput = {
  postId: Scalars["ID"];
  text?: InputMaybe<Scalars["String"]>;
};

export type CommentPayload = {
  __typename?: "CommentPayload";
  comment?: Maybe<Comment>;
  userErrors: Array<UserError>;
};

export type CommentsConnection = {
  __typename?: "CommentsConnection";
  comments: Array<Maybe<Comment>>;
  count?: Maybe<Scalars["Int"]>;
  cursor?: Maybe<Scalars["String"]>;
  hasMore: Scalars["Boolean"];
};

export type CredentialsInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type FollowUserResult = {
  __typename?: "FollowUserResult";
  userErrors: Array<UserError>;
};

export type LikePostPayload = {
  __typename?: "LikePostPayload";
  likes?: Maybe<LikedPost>;
  userErrors: Array<UserError>;
};

export type LikedPost = {
  __typename?: "LikedPost";
  date?: Maybe<Scalars["DateTime"]>;
  id: Scalars["ID"];
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
  signout: ResponseMessage;
  signup: AuthPayload;
  unfollowUser: UnfollowUserResult;
  updatePhotoProfile: Scalars["String"];
  updateUser: UserUpdatePayload;
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
  avatarUrl: Scalars["String"];
  credentials: CredentialsInput;
  name: Scalars["String"];
  secretToken: Scalars["String"];
  username: Scalars["String"];
};

export type MutationUnfollowUserArgs = {
  username: Scalars["String"];
};

export type MutationUpdatePhotoProfileArgs = {
  photo: Scalars["String"];
};

export type MutationUpdateUserArgs = {
  password: Scalars["String"];
  username: Scalars["String"];
};

export type Post = {
  __typename?: "Post";
  comments: Array<Maybe<Comment>>;
  content: Scalars["String"];
  createdAt?: Maybe<Scalars["DateTime"]>;
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

export type Query = {
  __typename?: "Query";
  getComments: CommentsConnection;
  getPost?: Maybe<Post>;
  getProfile?: Maybe<User>;
  getProfilePost?: Maybe<Array<Maybe<Post>>>;
  me?: Maybe<User>;
  posts: Array<Maybe<Post>>;
  status: Scalars["String"];
};

export type QueryGetCommentsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  pageSize?: InputMaybe<Scalars["Int"]>;
  postId: Scalars["ID"];
};

export type QueryGetPostArgs = {
  postId: Scalars["ID"];
};

export type QueryGetProfileArgs = {
  username: Scalars["String"];
};

export type QueryGetProfilePostArgs = {
  authorId: Scalars["ID"];
  limit: Scalars["Int"];
  offset: Scalars["Int"];
};

export type QueryPostsArgs = {
  limit: Scalars["Int"];
  offset: Scalars["Int"];
};

export type ResponseMessage = {
  __typename?: "ResponseMessage";
  message: Scalars["String"];
  userErrors: Array<UserError>;
};

export type Subscription = {
  __typename?: "Subscription";
  commentCreated?: Maybe<Comment>;
};

export type SubscriptionCommentCreatedArgs = {
  postId: Scalars["ID"];
};

export type UnfollowUserResult = {
  __typename?: "UnfollowUserResult";
  userErrors: Array<UserError>;
};

export type User = {
  __typename?: "User";
  avatarUrl?: Maybe<Scalars["String"]>;
  bio?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  isCreator: Scalars["Boolean"];
  name: Scalars["String"];
  posts: Array<Maybe<Post>>;
  profession?: Maybe<Array<Maybe<Profession>>>;
  slug?: Maybe<Scalars["String"]>;
  username?: Maybe<Scalars["String"]>;
};

export type UserError = {
  __typename?: "UserError";
  message: Scalars["String"];
};

export type UserUpdatePayload = {
  __typename?: "UserUpdatePayload";
  user?: Maybe<User>;
  userErrors: Array<UserError>;
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

export type CommentCreateMutationVariables = Exact<{
  comment: CommentInput;
}>;

export type CommentCreateMutation = {
  __typename?: "Mutation";
  commentCreate: {
    __typename?: "CommentPayload";
    userErrors: Array<{ __typename?: "UserError"; message: string }>;
  };
};

export type SigninMutationVariables = Exact<{
  credentials: CredentialsInput;
}>;

export type SigninMutation = {
  __typename?: "Mutation";
  signin: {
    __typename?: "AuthPayload";
    userErrors: Array<{ __typename?: "UserError"; message: string }>;
    user?:
      | {
          __typename: "User";
          id: string;
          username?: string | null | undefined;
          name: string;
          email?: string | null | undefined;
          bio?: string | null | undefined;
          slug?: string | null | undefined;
          avatarUrl?: string | null | undefined;
          isCreator: boolean;
          profession?:
            | Array<
                | { __typename?: "Profession"; id: string; role: string }
                | null
                | undefined
              >
            | null
            | undefined;
        }
      | null
      | undefined;
  };
};

export type SignupMutationVariables = Exact<{
  secretToken: Scalars["String"];
  name: Scalars["String"];
  username: Scalars["String"];
  avatarUrl: Scalars["String"];
  credentials: CredentialsInput;
}>;

export type SignupMutation = {
  __typename?: "Mutation";
  signup: {
    __typename?: "AuthPayload";
    userErrors: Array<{ __typename?: "UserError"; message: string }>;
  };
};

export type UpdateUserMutationVariables = Exact<{
  password: Scalars["String"];
  username: Scalars["String"];
}>;

export type UpdateUserMutation = {
  __typename?: "Mutation";
  updateUser: {
    __typename?: "UserUpdatePayload";
    userErrors: Array<{ __typename?: "UserError"; message: string }>;
    user?:
      | {
          __typename: "User";
          name: string;
          username?: string | null | undefined;
          avatarUrl?: string | null | undefined;
          isCreator: boolean;
          profession?:
            | Array<
                { __typename?: "Profession"; role: string } | null | undefined
              >
            | null
            | undefined;
        }
      | null
      | undefined;
  };
};

export type GetCommentsQueryVariables = Exact<{
  postId: Scalars["ID"];
  after?: InputMaybe<Scalars["String"]>;
  pageSize?: InputMaybe<Scalars["Int"]>;
}>;

export type GetCommentsQuery = {
  __typename?: "Query";
  getComments: {
    __typename?: "CommentsConnection";
    count?: number | null | undefined;
    cursor?: string | null | undefined;
    hasMore: boolean;
    comments: Array<
      | {
          __typename?: "Comment";
          id: string;
          text: string;
          date?: any | null | undefined;
          user: {
            __typename?: "User";
            name: string;
            username?: string | null | undefined;
          };
        }
      | null
      | undefined
    >;
  };
};

export type GetPostsQueryVariables = Exact<{
  postId: Scalars["ID"];
}>;

export type GetPostsQuery = {
  __typename?: "Query";
  getPost?:
    | {
        __typename?: "Post";
        content: string;
        user: {
          __typename?: "User";
          name: string;
          username?: string | null | undefined;
        };
        comments: Array<
          { __typename?: "Comment"; id: string } | null | undefined
        >;
        likes: Array<
          { __typename?: "LikedPost"; id: string } | null | undefined
        >;
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
        __typename: "User";
        id: string;
        username?: string | null | undefined;
        name: string;
        email?: string | null | undefined;
        bio?: string | null | undefined;
        slug?: string | null | undefined;
        avatarUrl?: string | null | undefined;
        isCreator: boolean;
        profession?:
          | Array<
              | { __typename?: "Profession"; id: string; role: string }
              | null
              | undefined
            >
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type GetProfilePostQueryVariables = Exact<{
  authorId: Scalars["ID"];
  limit: Scalars["Int"];
  offset: Scalars["Int"];
}>;

export type GetProfilePostQuery = {
  __typename?: "Query";
  getProfilePost?:
    | Array<
        | {
            __typename?: "Post";
            id: string;
            content: string;
            likes: Array<
              { __typename?: "LikedPost"; id: string } | null | undefined
            >;
            comments: Array<
              { __typename?: "Comment"; id: string } | null | undefined
            >;
          }
        | null
        | undefined
      >
    | null
    | undefined;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me?:
    | {
        __typename: "User";
        id: string;
        username?: string | null | undefined;
        name: string;
        email?: string | null | undefined;
        bio?: string | null | undefined;
        slug?: string | null | undefined;
        avatarUrl?: string | null | undefined;
        isCreator: boolean;
        profession?:
          | Array<
              | { __typename?: "Profession"; id: string; role: string }
              | null
              | undefined
            >
          | null
          | undefined;
      }
    | null
    | undefined;
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
          username?: string | null | undefined;
          id: string;
          name: string;
        };
        likes: Array<
          { __typename?: "LikedPost"; id: string } | null | undefined
        >;
        comments: Array<
          { __typename?: "Comment"; id: string } | null | undefined
        >;
      }
    | null
    | undefined
  >;
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
export const CommentCreateDocument = gql`
  mutation commentCreate($comment: CommentInput!) {
    commentCreate(comment: $comment) {
      userErrors {
        message
      }
    }
  }
`;
export type CommentCreateMutationFn = Apollo.MutationFunction<
  CommentCreateMutation,
  CommentCreateMutationVariables
>;

/**
 * __useCommentCreateMutation__
 *
 * To run a mutation, you first call `useCommentCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommentCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commentCreateMutation, { data, loading, error }] = useCommentCreateMutation({
 *   variables: {
 *      comment: // value for 'comment'
 *   },
 * });
 */
export function useCommentCreateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CommentCreateMutation,
    CommentCreateMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CommentCreateMutation,
    CommentCreateMutationVariables
  >(CommentCreateDocument, options);
}
export type CommentCreateMutationHookResult = ReturnType<
  typeof useCommentCreateMutation
>;
export type CommentCreateMutationResult =
  Apollo.MutationResult<CommentCreateMutation>;
export type CommentCreateMutationOptions = Apollo.BaseMutationOptions<
  CommentCreateMutation,
  CommentCreateMutationVariables
>;
export const SigninDocument = gql`
  mutation signin($credentials: CredentialsInput!) {
    signin(credentials: $credentials) {
      userErrors {
        message
      }
      user {
        id
        __typename
        username
        name
        email
        bio
        slug
        avatarUrl
        isCreator
        profession {
          id
          role
        }
      }
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
    $avatarUrl: String!
    $credentials: CredentialsInput!
  ) {
    signup(
      secretToken: $secretToken
      name: $name
      username: $username
      avatarUrl: $avatarUrl
      credentials: $credentials
    ) {
      userErrors {
        message
      }
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
 *      avatarUrl: // value for 'avatarUrl'
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
export const UpdateUserDocument = gql`
  mutation updateUser($password: String!, $username: String!) {
    updateUser(password: $password, username: $username) {
      userErrors {
        message
      }
      user {
        __typename
        name
        username
        avatarUrl
        isCreator
        profession {
          role
        }
      }
    }
  }
`;
export type UpdateUserMutationFn = Apollo.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      password: // value for 'password'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    options
  );
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>;
export type UpdateUserMutationResult =
  Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;
export const GetCommentsDocument = gql`
  query getComments($postId: ID!, $after: String, $pageSize: Int) {
    getComments(postId: $postId, after: $after, pageSize: $pageSize) {
      count
      cursor
      hasMore
      comments {
        id
        text
        date
        user {
          name
          username
        }
      }
    }
  }
`;

/**
 * __useGetCommentsQuery__
 *
 * To run a query within a React component, call `useGetCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentsQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *      after: // value for 'after'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useGetCommentsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetCommentsQuery,
    GetCommentsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCommentsQuery, GetCommentsQueryVariables>(
    GetCommentsDocument,
    options
  );
}
export function useGetCommentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCommentsQuery,
    GetCommentsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCommentsQuery, GetCommentsQueryVariables>(
    GetCommentsDocument,
    options
  );
}
export type GetCommentsQueryHookResult = ReturnType<typeof useGetCommentsQuery>;
export type GetCommentsLazyQueryHookResult = ReturnType<
  typeof useGetCommentsLazyQuery
>;
export type GetCommentsQueryResult = Apollo.QueryResult<
  GetCommentsQuery,
  GetCommentsQueryVariables
>;
export const GetPostsDocument = gql`
  query getPosts($postId: ID!) {
    getPost(postId: $postId) {
      content
      user {
        name
        username
      }
      comments {
        id
      }
      likes {
        id
      }
    }
  }
`;

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useGetPostsQuery(
  baseOptions: Apollo.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPostsQuery, GetPostsQueryVariables>(
    GetPostsDocument,
    options
  );
}
export function useGetPostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPostsQuery,
    GetPostsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(
    GetPostsDocument,
    options
  );
}
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<
  typeof useGetPostsLazyQuery
>;
export type GetPostsQueryResult = Apollo.QueryResult<
  GetPostsQuery,
  GetPostsQueryVariables
>;
export const GetProfileDocument = gql`
  query getProfile($username: String!) {
    getProfile(username: $username) {
      __typename
      id
      username
      name
      email
      bio
      slug
      avatarUrl
      isCreator
      profession {
        id
        role
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
export const GetProfilePostDocument = gql`
  query getProfilePost($authorId: ID!, $limit: Int!, $offset: Int!) {
    getProfilePost(authorId: $authorId, limit: $limit, offset: $offset) {
      id
      content
      likes {
        id
      }
      comments {
        id
      }
    }
  }
`;

/**
 * __useGetProfilePostQuery__
 *
 * To run a query within a React component, call `useGetProfilePostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfilePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfilePostQuery({
 *   variables: {
 *      authorId: // value for 'authorId'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetProfilePostQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetProfilePostQuery,
    GetProfilePostQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetProfilePostQuery, GetProfilePostQueryVariables>(
    GetProfilePostDocument,
    options
  );
}
export function useGetProfilePostLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetProfilePostQuery,
    GetProfilePostQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetProfilePostQuery, GetProfilePostQueryVariables>(
    GetProfilePostDocument,
    options
  );
}
export type GetProfilePostQueryHookResult = ReturnType<
  typeof useGetProfilePostQuery
>;
export type GetProfilePostLazyQueryHookResult = ReturnType<
  typeof useGetProfilePostLazyQuery
>;
export type GetProfilePostQueryResult = Apollo.QueryResult<
  GetProfilePostQuery,
  GetProfilePostQueryVariables
>;
export const MeDocument = gql`
  query Me {
    me {
      id
      __typename
      username
      name
      email
      bio
      slug
      avatarUrl
      isCreator
      profession {
        id
        role
      }
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
        id
      }
      comments {
        id
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
