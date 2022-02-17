import { InMemoryCache } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: offsetLimitPagination(),
        comments: {
          keyArgs: false,
          merge(existing: [], incoming) {
            return incoming;
          },
        },
      },
    },
  },
});
