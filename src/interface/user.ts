import { Prisma, Profession } from "@prisma/client";
import { CheckPayloadType } from "./check";

// user have profession like developer
export interface ProfessionArgs {
  profession: {
    role?: string;
  };
}

export interface ProfessionPayloadType extends CheckPayloadType {
  profession: Profession | Prisma.Prisma__ProfessionClient<Profession> | null;
}

export interface FollowUserResult extends CheckPayloadType {
  ok: boolean;
  message: string;
}

export interface UnFollowUserResult extends CheckPayloadType {
  ok: boolean;
  message: string;
}
