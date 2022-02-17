import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  type Query {
    status: String!
    me: User
    comments(limit: Int!, offset: Int!, postId: ID!): [Comment]!
    posts(limit: Int!, offset: Int!): [Post]!
    getProfile(username: String!): User
    getPost(postId: ID!): Post
  }

  scalar Date

  type Mutation {
    postCreate(post: PostInput!): PostPayload!
    postUpdate(postId: ID!, post: PostInput!): PostPayload!
    postPublished(postId: ID!): PostPayload!
    postUnPublished(postId: ID!): PostPayload!
    likesCreate(postId: ID!): LikePostPayload!
    postDelete(postId: ID!): PostPayload!
    commentCreate(comment: CommentInput!): CommentPayload!
    professionCreate(profession: ProfessionInput!): ProfessionPayload!
    professionDelete(professionId: ID!): ProfessionPayload!
    signup(
      name: String!
      username: String!
      secretToken: String!
      credentials: CredentialsInput!
    ): AuthPayload!
    signin(credentials: CredentialsInput!): AuthPayload!
    #just check username
    checkUsername(username: String!): CheckPayload!
    activationAccount(
      emailAccount: String!
      tokenAccount: String!
    ): ActivationAccountPayload!
    followUser(username: String!): FollowUserResult!
    unfollowUser(username: String!): UnfollowUserResult!
  }

  type Post {
    id: ID!
    #an array for likes
    likes: [LikedPost]!
    comments: [Comment]!
    content: String!
    createdAt: Date
    published: Boolean!
    #relation to User Type
    user: User!
  }

  type LikedPost {
    id: ID!
    likedAt: String!
    user: User!
  }

  type Comment {
    id: Int!
    text: String!
    user: User!
    createdAt: Date
  }

  type Profession {
    id: ID!
    role: String!
    #relation to User
    user: User!
  }

  type User {
    id: ID!
    isMyProfile: Boolean!
    bio: String!
    slug: String!
    token: String!
    username: String!
    name: String!
    email: String
    avatarUrl: String
    isVerified: Boolean!
    posts: [Post]!
    profession: [Profession!]!
  }

  type Profile {
    #relation to User
    user: User!
  }

  type Account {
    id: ID!
    providerType: String!
    providerId: String!
    #relation to User
    user: User!
  }

  type FollowUserResult {
    ok: Boolean!
    message: String!
  }

  type UnfollowUserResult {
    ok: Boolean!
    message: String!
  }

  type UserError {
    message: String!
  }

  type CheckPayload {
    userErrors: [UserError!]!
  }

  type AuthPayload {
    userErrors: [UserError!]!
    token: String
    account: Account
  }

  type PostPayload {
    userErrors: [UserError!]!
    post: Post
  }

  type LikePostPayload {
    userErrors: [UserError!]!
    likes: LikedPost
  }

  type ProfessionPayload {
    userErrors: [UserError!]!
    profession: Profession
  }

  type CommentPayload {
    userErrors: [UserError!]!
    comment: Comment
  }

  type ActivationAccountPayload {
    userErrors: [UserError!]!
    user: User
  }

  input PostInput {
    content: String
  }

  input CommentInput {
    text: String
    postId: Int
  }

  input ProfessionInput {
    role: String
  }

  input CredentialsInput {
    email: String!
    password: String!
  }
`;
