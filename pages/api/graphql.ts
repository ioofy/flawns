import { typeDefs } from "@schema/schema";
import { ApolloServer } from "apollo-server-micro";
import { PageConfig } from "next";
import { prisma } from "@lib/prisma";
import { getUserFromToken } from "@utils/getUserFromToken";
import { Context } from "@interface/db";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import Cors from "micro-cors";
import * as AllObj from "@services/index";

const cors = Cors();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers: {
    ...AllObj,
  },
  context: async ({ req }: any): Promise<Context> => {
    // get user token and user.id from jwt bearer token
    const userInfo = getUserFromToken(req.headers.authorization);
    return {
      db,
      userInfo,
    };
  },
  introspection: true,
  // using playground plugins from apollo
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const serverStart = apolloServer.start();

export default cors(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  // returning
  await serverStart;
  await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
});

export const config: PageConfig = { api: { bodyParser: false } };
export const db = prisma;
