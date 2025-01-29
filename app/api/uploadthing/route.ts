import { createNextRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";

// Export des routes pour l'application Next.js
export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
});
