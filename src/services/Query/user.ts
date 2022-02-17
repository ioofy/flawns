import { Context } from "@interface/db";

export const userQuery = {
  me: async (_: any, __: any, { db, userInfo }: Context) => {
    if (!userInfo) return null;

    return db.user.findUnique({
      where: {
        id: userInfo.userId,
      },
    });
  },

  getProfile: async (
    _: any,
    { username }: { username: string },
    { db, userInfo }: Context
  ) => {
    const isMyProfile = username === userInfo?.username;

    const profile = await db.user.findUnique({
      where: {
        username,
      },
    });

    if (!profile) return null;

    return {
      ...profile,
      isMyProfile,
    };
  },
};
