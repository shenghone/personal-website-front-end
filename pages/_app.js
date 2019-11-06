import App, { Container } from "next/app";
import React from "react";
import Head from "next/head";
import withApolloClient from "../lib/with-apollo-client";
import { ApolloProvider } from "react-apollo";
import { Provider } from "react-redux";
import { store } from "../redux";

class MyApp extends App {
  static displayName = "MyApp";
  render() {
    const { Component, pageProps, apolloClient } = this.props;

    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
