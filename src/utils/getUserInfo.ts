import { Context } from "@interface/db";

interface ContextDatabase {
  db: Context["db"];
}

// for get post info
interface GetUserPostInfo extends ContextDatabase {
  userId: number;
  postId: number;
}

// for get profession info
interface GetUserProfessionInfo extends ContextDatabase {
  userId: number;
  professionId: number;
}

export const getUserPostInfo = async ({
  userId,
  postId,
  db,
}: GetUserPostInfo) => {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return {
      userErrors: [
        {
          message: "User not found",
        },
      ],
      post: null as any,
    };
  }

  const post = await db.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (post?.authorId !== user.id) {
    return {
      userErrors: [
        {
          message: "Post is not owned by user",
        },
      ],
      post: null,
    };
  }
};

export const getUserProfessionProfile = async ({
  userId,
  professionId,
  db,
}: GetUserProfessionInfo) => {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return {
      userErrors: [
        {
          message: "User not found",
        },
      ],
      profession: null as any,
    };
  }

  const profession = await db.profession.findUnique({
    where: {
      id: professionId,
    },
  });

  if (profession?.userId !== user.id) {
    return {
      userErrors: [
        {
          message: "Profession is not owned by user",
        },
      ],
      profession: null,
    };
  }
};
