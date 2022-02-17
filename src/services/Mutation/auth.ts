import { Context } from "@interface/db";
import {
  SignInArgs,
  SignUpArgs,
  UserActivationPayloadType,
  UserPayloadType,
} from "@interface/auth";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import { randomInt } from "@utils/getRandomImage";

// you must create jwt_secret in your env file
const JWT_SECRET = process.env.JWT_SECRET as string;

export const authResolvers = {
  signup: async (
    _: any,
    { name, credentials, username, secretToken }: SignUpArgs,
    { db }: Context
  ): Promise<UserPayloadType> => {
    const { email, password } = credentials;
    // validating true email
    const isEmail = validator.isEmail(email);
    // validating username
    const isUsername = validator.isAlphanumeric(username);
    // validating password for length of password
    const isValidPassword = validator.isLength(password, { min: 7 });
    // hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    // get random string
    const getUrlImage = `/avatar/__static${randomInt}.png`;
    // generate a token for verifying account

    // Check if there is a user with the same email
    const foundEmail = await db.user.findUnique({
      where: {
        email,
      },
    });

    const foundUsername = await db.user.findUnique({
      where: {
        username,
      },
    });

    if (!name || !username) {
      return {
        userErrors: [
          {
            message: "Do not leave all form blank, provide your data bellow.",
          },
        ],
        token: null,
      };
    }

    // single
    if (foundEmail) {
      return {
        userErrors: [
          {
            message: "Email  is already in taken",
          },
        ],
        token: null,
      };
    }

    // single
    if (foundUsername) {
      return {
        userErrors: [
          {
            message: "Username is already in taken",
          },
        ],
        token: null,
      };
    }
    if (!isEmail) {
      return {
        userErrors: [
          {
            message: "Please provide a valid email",
          },
        ],
        token: null,
      };
    }

    if (!isUsername) {
      return {
        userErrors: [
          {
            message: "Please provide a valid username",
          },
        ],
        token: null,
      };
    }

    if (!isValidPassword) {
      return {
        userErrors: [
          {
            message: "Please provide a max 7 character password",
          },
        ],
        token: null,
      };
    }

    const user = await db.user.create({
      data: {
        username,
        name,
        email,
        token: secretToken,
        // get random url gravatar
        avatarUrl: getUrlImage,
        password: hashedPassword,
      },
    });

    // jwt token
    const token = JWT.sign(
      {
        userId: user.id,
        username: user.username,
      },
      JWT_SECRET,
      {
        expiresIn: 3600000,
      }
    );

    return {
      userErrors: [],
      token,
    };
  },

  signin: async (
    _: any,
    { credentials }: SignInArgs,
    { db }: Context
  ): Promise<UserPayloadType> => {
    const { email, password } = credentials;

    // compare input form email with data in database avaliable or not
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return {
        userErrors: [
          {
            message: "Can't find user with this email",
          },
        ],

        token: null,
      };
    }

    if (user.isVerified === false) {
      return {
        userErrors: [
          {
            message: "Please verified your account first",
          },
        ],

        token: null,
      };
    }

    // compare and force override user.password as string
    const isMatch = await bcrypt.compare(password, user.password as string);

    if (!isMatch) {
      return {
        userErrors: [
          {
            message: "Your password does not match",
          },
        ],

        token: null,
      };
    }

    const token = JWT.sign(
      { userId: user.id, username: user.username },
      JWT_SECRET,
      {
        expiresIn: 60 * 60 * 24,
      }
    );

    return {
      userErrors: [],
      token,
    };
  },
  activationAccount: async (
    _: any,
    {
      emailAccount,
      tokenAccount,
    }: { emailAccount: string; tokenAccount: string },
    { db }: Context
  ): Promise<UserActivationPayloadType> => {
    const findEmail = await db.user.findUnique({
      where: {
        email: emailAccount,
      },
    });

    if (!findEmail) {
      return {
        userErrors: [
          {
            message: "😵 Hmmm... Your account is not found",
          },
        ],
        user: null,
      };
    }

    if (findEmail.token !== tokenAccount) {
      return {
        userErrors: [
          {
            message:
              "👀 Oops...Your secret token is invalid. Please check your email",
          },
        ],
        user: null,
      };
    }

    if (findEmail.isVerified === true) {
      return {
        userErrors: [
          {
            message: "😒 Sheeesh... Your account is verified.",
          },
        ],
        user: null,
      };
    }

    const userVerified = await db.user.update({
      where: {
        email: emailAccount,
      },
      data: {
        isVerified: true,
      },
    });

    return {
      userErrors: [],
      user: userVerified,
    };
  },
};
