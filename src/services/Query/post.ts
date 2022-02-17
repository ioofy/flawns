import { Context } from "@interface/db";

// optional arguments
type OpArgs = {
  limit: number | any;
  postId: number | any;
  offset: number | any;
};

export const postQuery = {
  status: () => "Our server is running!",
  posts: async (_: any, { limit, offset }: OpArgs, { db }: Context) => {
    const getAllPosts = await db.post.findMany({
      where: {
        published: true,
      },
      // filtering by date create
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
      take: limit,
      skip: offset,
    });

    return getAllPosts;
  },
  getPost: async (_: any, { postId }: { postId: string }, { db }: Context) => {
    const getPostWithId = await db.post.findUnique({
      where: {
        id: +postId,
      },
    });

    return getPostWithId;
  },
  comments: async (
    _: any,
    { limit, offset, postId }: OpArgs,
    { db }: Context
  ) => {
    const getAllComments = await db.comment.findMany({
      where: {
        postId: +postId,
      },

      orderBy: [
        {
          createdAt: "desc",
        },
      ],
      take: limit,
      skip: offset,
    });

    return getAllComments;
  },
};
