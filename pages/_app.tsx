import React from "react";
import Maintenance from "@components/404/maintenance";
import Head from "next/head";
import Layout from "@layout/Layout";
import { GlobalStyles } from "@styles/global.styles";
import { ApolloProvider } from "@apollo/client";
import { client } from "@lib/apollo";
import { AppProps } from "next/app";

// tailwind
import "@styles/css/globals.css";
// import ProvidersTheme from "@config/providersTheme";

function MyApp({ Component, pageProps }: AppProps) {
  if (process.env.NEXT_PUBLIC_MAINTENANCE === "true") {
    return (
      <>
        <GlobalStyles />
        <Maintenance />
      </>
    );
  }
  return (
    <Layout>
      <ApolloProvider client={client}>
        <GlobalStyles />
        {/* default title */}
        <Head>
          <title>Flawn - Flawnn 👩‍🎤👨‍🎤</title>
        </Head>
        <Component {...pageProps} />
      </ApolloProvider>
    </Layout>
  );
}

export default MyApp;
