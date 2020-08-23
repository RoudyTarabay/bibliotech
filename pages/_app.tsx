import useMediaQuery from "@material-ui/core/useMediaQuery";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { AppProps } from "next/app";
import fetch from "node-fetch";

import "typeface-roboto";
import indigo from "@material-ui/core/colors/indigo";
import red from "@material-ui/core/colors/red";
import Head from "next/head";
import React, { useState } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ApolloClient } from "apollo-client";
import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/react-hooks";
import AuthContext from "../contexts/authContext";
const MyApp = ({ Component, pageProps }: AppProps): React.ReactElement => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = createMuiTheme({
    palette: {
      type: prefersDarkMode ? "dark" : "light",
      primary: indigo,
      secondary: red,
    },
  });
  const cache = new InMemoryCache();
  const link = createHttpLink({
    uri: "http://localhost:4000/",
    fetch: fetch,
  });
  const [id, setId] = useState(null);
  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache,
    link,
  });
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <AuthContext.Provider value={{ id, setId }}>
            <CssBaseline />
            <Component {...pageProps} />
            <style global jsx>{`
               {
                body {
                  min-height: 100vh;
                }
              }
            `}</style>
          </AuthContext.Provider>
        </ThemeProvider>
      </ApolloProvider>
    </React.Fragment>
  );
};
// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }
export {};
export default MyApp;
