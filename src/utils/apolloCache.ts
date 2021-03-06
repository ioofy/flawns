import { InMemoryCache } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: {
          ...offsetLimitPagination(),
        },

        getComments: {
          keyArgs: ["postId"],
          merge(existing, incoming, { args }) {
            if (existing === undefined) {
              return incoming;
            }

            if (args.after && existing.comments) {
              return Object.assign({}, incoming, {
                comments: [...existing.comments, ...incoming.comments],
              });
            } else {
              return incoming;
            }
          },
        },
        getSubComments: {
          keyArgs: ["commentId"],
          merge(existing, incoming, { args }) {
            if (existing === undefined) {
              return incoming;
            }

            if (args.after && existing.subComments) {
              return Object.assign({}, incoming, {
                subComments: [...existing.subComments, ...incoming.subComments],
              });
            } else {
              return incoming;
            }
          },
        },
      },
    },
  },
});
