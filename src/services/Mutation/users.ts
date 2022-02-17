import {
  FollowUserResult,
  ProfessionArgs,
  ProfessionPayloadType,
  // UnFollowUserResult,
} from "@interface/user";
import { Context } from "@interface/db";
import { getUserProfessionProfile } from "@utils/getUserInfo";
import { CheckPayloadType } from "@interface/check";
import { User } from "@prisma/client";
import validator from "validator";

export const userResolvers = {
  professionCreate: async (
    _: any,
    { profession }: ProfessionArgs,
    { db, userInfo }: Context
  ): Promise<ProfessionPayloadType> => {
    const { role } = profession;

    // findRole
    const findRole = await db.profession.findUnique({
      where: {
        role,
      },
    });

    if (findRole) {
      return {
        userErrors: [
          {
            message: "You have this role on your profile",
          },
        ],
        profession: null,
      };
    }

    // if user not authenticated by authorization bearer
    if (!userInfo) {
      return {
        userErrors: [
          {
            message: "Don’t miss it, come join with us",
          },
        ],
        profession: null,
      };
    }

    if (!role) {
      return {
        userErrors: [
          {
            message: "Please provide what you are?",
          },
        ],
        profession: null,
      };
    }

    return {
      userErrors: [],
      profession: await db.profession.create({
        data: {
          role,
          // get from token userinfo
          userId: userInfo.userId,
        },
      }),
    };
  },

  professionDelete: async (
    _: any,
    { professionId }: { professionId: string },
    { db, userInfo }: Context
  ): Promise<ProfessionPayloadType> => {
    const profession = await db.profession.findUnique({
      where: {
        id: +professionId,
      },
    });

    // if user not authenticated by authorization bearer
    if (!userInfo) {
      return {
        userErrors: [
          {
            message: "Don’t miss it, come join with us",
          },
        ],
        profession: null,
      };
    }

    // if role profession doesnt exist following by id
    if (!profession) {
      return {
        userErrors: [
          {
            message: "Role doesn't exist",
          },
        ],
        profession: null,
      };
    }

    const error = await getUserProfessionProfile({
      userId: userInfo.userId,
      professionId: +professionId,
      db,
    });

    if (error) return error;

    await db.profession.delete({
      where: {
        id: +professionId,
      },
    });

    return {
      userErrors: [
        {
          message: "Profession Deleted",
        },
      ],
      profession,
    };
  },

  checkUsername: async (
    _: any,
    { username }: { username: string },
    { db }: Context
  ): Promise<CheckPayloadType> => {
    const isUsername = validator.isAlphanumeric(username);
    const getUsernameFromUser = await db.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!isUsername) {
      return {
        userErrors: [
          {
            message: "😟 Please provide valid username",
          },
        ],
      };
    }

    if (getUsernameFromUser) {
      return {
        userErrors: [
          {
            message: "😟 Oops. Username already taken",
          },
        ],
      };
    }

    return {
      userErrors: [],
      // do nothing
    };
  },

  followUser: async (
    _: any,
    { username }: { username: string },
    { db, userInfo }: Context
  ): Promise<FollowUserResult> => {
    // if user not authenticated by authorization bearer
    const foundUser: User | null = await db.user.findUnique({
      where: { username },
    });

    if (foundUser === null) {
      return {
        userErrors: [
          {
            message: "User not found",
          },
        ],
        ok: false,
        message: "User not found",
      };
    }

    if (!userInfo) {
      return {
        userErrors: [
          {
            message: "Don’t miss it, come join with us",
          },
        ],
        message: "Signin first",
        ok: false,
      };
    }

    await db.user.update({
      where: {
        id: userInfo.userId,
      },
      data: {
        following: {
          connect: { username },
        },
      },
    });

    return {
      userErrors: [],
      message: "Succesfull following user",
      ok: true,
    };
  },

  // unfollowUser: async (
  //   _: any,
  //   { username }: { username: string },
  //   { db, userInfo }: Context
  // ): Promise<UnFollowUserResult> => {
  //   // if user not authenticated by authorization bearer
  //   const foundUser: User | null = await db.user.findUnique({
  //     where: { username },
  //   });
  // },
};
