/** @type {import('next').NextConfig} */

const { withSentryConfig } = require("@sentry/nextjs");

const moduleExports = {
  reactStrictMode: true,
  optimizeFonts: false,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "gravatar.com",
      "res.cloudinary.com",
    ],
  },

  // find a public folder for nextjs app with starting project_root
  // @reference
  // https://stackoverflow.com/questions/54436021/nextjs-public-folder

  // Work only in local development
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
  },

  experimental: { outputFileTracing: true },
};

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
