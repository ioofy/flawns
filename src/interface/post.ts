import { Prisma, Post, Comment, LikedPost } from "@prisma/client";
import { CheckPayloadType } from "./check";

export interface PostArgs {
  post: {
    content?: string;
  };
}

export interface CommentArgs {
  comment: {
    text?: string;
    postId: number;
  };
}

export interface PostPayloadType extends CheckPayloadType {
  post: Post | Prisma.Prisma__PostClient<Post> | null;
}

export interface CommentPayloadType extends CheckPayloadType {
  comment: Comment | Prisma.Prisma__CommentClient<Comment> | null;
}

export interface LikesPayloadType extends CheckPayloadType {
  likes: LikedPost | Prisma.Prisma__LikedPostClient<LikedPost> | null;
}
