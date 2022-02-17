const settings = {
  graphql: {
    uri: `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`,
  },
  meta: {
    rootUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
    title: "Welcome to flawn",
    description:
      "Flawn 👨‍🎤 is a social media platforms apps for creator, developer, and more.",
    social: {
      // Will change latter
      graphic: "https://flawn.vercel.app/favicon.ico/",
      twitter: "@Flawn",
    },
  },
  routes: {
    authenticated: {
      pathAfterFailure: "/login",
    },
  },
};

export default settings;
