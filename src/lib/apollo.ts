import { ApolloClient, ApolloLink, HttpLink, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { SentryLink } from "apollo-link-sentry";
import { cache } from "@utils/apolloCache";

const httpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
  credentials: "include",
  fetchOptions: {
    credentials: "include",
  },
});

const wsLink = process.browser
  ? new WebSocketLink({
      // if you instantiate in the server, the error will be thrown
      uri: `${process.env.NEXT_PUBLIC_API_WS_URL}/graphql`,
      options: {
        reconnect: true,
      },
    })
  : null;

const splitLink = process.browser
  ? split(
      // only create the split in the browser
      // split based on operation type
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink,
      httpLink
    )
  : httpLink;

if (!process.browser) {
  global.fetch = fetch;
}

export const client = new ApolloClient({
  link: ApolloLink.from([new SentryLink(), splitLink]),
  ssrMode: !process.browser,
  credentials: "include",
  cache,
});
