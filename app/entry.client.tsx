import { RemixBrowser } from "@remix-run/react";
import { hydrateRoot } from "react-dom/client";

// NOTE: I would keep this file to the default implementation
// as you don not really want to tweak the hydration of the application (I assume)
// Remix doc: https://remix.run/docs/en/main/file-conventions/entry.client
function Client() {
  return <RemixBrowser />;
}

hydrateRoot(document, <Client />);
