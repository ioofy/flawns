import { Context } from "@interface/db";

interface CommentPostParentType {
  userId: number;
}

export const Comment = {
  user: async (_parent: CommentPostParentType, __: any, { db }: Context) => {
    return db.user.findUnique({
      where: {
        id: _parent.userId,
      },
    });
  },
};
