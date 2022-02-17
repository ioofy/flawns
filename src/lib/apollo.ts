import { ApolloClient, ApolloLink, HttpLink } from "@apollo/client";
import { SentryLink } from "apollo-link-sentry";
import { cache } from "@utils/apolloCache";

export const client = new ApolloClient({
  link: ApolloLink.from([
    new SentryLink(),
    new HttpLink({ uri: `${process.env.NEXT_PUBLIC_API_URL}/api/graphql` }),
  ]),
  cache,
});
