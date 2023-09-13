// TODO: Remove unused imports
//import { cssBundleHref } from "@remix-run/css-bundle";
//import type { LinksFunction } from "@remix-run/node";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

// TODO: Remove unused/dead code
// export const links: LinksFunction = () => [
//   ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
// ];

// TODO: Move the client to the top
const client = new ApolloClient({
  ssrMode: true,
  cache: new InMemoryCache(),
  uri: "https://countries.trevorblades.com/graphql", // Make sure the URI is correct
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
