//It's the starting point for rendering the entire application.

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

const client = new ApolloClient({
  ssrMode: true,
  cache: new InMemoryCache(),
  uri: "https://countries.trevorblades.com/graphql",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ApolloProvider client={client}>
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </ApolloProvider>
      </body>
    </html>
  );
}
