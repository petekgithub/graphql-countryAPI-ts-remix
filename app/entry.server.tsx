import { ApolloProvider, InMemoryCache, ApolloClient } from "@apollo/client";
import type { EntryContext } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const client = new ApolloClient({
    ssrMode: true,
    cache: new InMemoryCache(),
    uri: "https://countries.trevorblades.com/graphql",
  });

  const App = <ApolloProvider client={client}><RemixServer context={remixContext} url={request.url} /></ApolloProvider>;

  const markup = renderToString(App);

  responseHeaders.set("Content-Type", "text/html");

  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}