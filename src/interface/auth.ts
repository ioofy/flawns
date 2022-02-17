import { Prisma, User } from "@prisma/client";
import { CheckPayloadType } from "./check";

interface Credentials {
  credentials: {
    email: string;
    password: string;
  };
}

export interface SignUpArgs extends Credentials {
  username: string;
  name: string;
  secretToken: string;
}

export interface SignInArgs extends Credentials {}

export interface UserPayloadType extends CheckPayloadType {
  token: string | null;
  // create a table for accounts in db
}

export interface UserActivationPayloadType extends CheckPayloadType {
  user: User | Prisma.Prisma__UserClient<User> | null;
}
