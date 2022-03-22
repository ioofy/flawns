import React from "react";
import Maintenance from "@components/CustomError/Maintenance";
import Head from "next/head";
import Layout from "@layout/Layout";
import { GlobalStyles } from "@styles/global.styles";
import { ApolloProvider } from "@apollo/client";
import { client } from "@lib/apollo";
import { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
// tailwind
import "@styles/css/globals.css";
import AuthContextProvider from "@context/AuthContextProvider";
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
        <AuthContextProvider>
          <Toaster
            position="top-center"
            reverseOrder={false}
            containerClassName="toaster"
          />
          {/* default title */}
          <Head>
            <title>Flawn - Flawnn 👩‍🎤👨‍🎤</title>
            <link rel="icon" href="/logo.png" />
          </Head>
          <Component {...pageProps} />
        </AuthContextProvider>
      </ApolloProvider>
    </Layout>
  );
}

export default MyApp;
