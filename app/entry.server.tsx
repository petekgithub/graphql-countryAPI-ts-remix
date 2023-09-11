import type { EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

export default function handleRequest(
  request: Request, // Request type from the Fetch API
  responseStatusCode: number,
  responseHeaders: Headers, // Headers type from the Fetch API
  remixContext: EntryContext
) {
  const requestHeaders: Record<string, string> = {};

  request.headers.forEach((value, key) => {
    requestHeaders[key] = value;
  });

  const client = new ApolloClient({
    ssrMode: true,
    cache: new InMemoryCache(),
    link: createHttpLink({
      uri: "https://countries.trevorblades.com/graphql", // Countries API URL
      headers: requestHeaders,
      credentials: request.credentials ?? "include", // or "same-origin" if your backend server is the same domain
    }),
  });

  const App = (
    <ApolloProvider client={client}>
      <RemixServer context={remixContext} url={request.url} />
    </ApolloProvider>
  );

  const markup = renderToString(App);

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
