import { env } from "cloudflare:workers";
import { cors } from "hono/cors";

// CORS middleware for auth endpoints
export const authCorsMiddleware = cors({
  origin: env.CORS_ORIGIN || "",
  allowHeaders: ["Content-Type", "Authorization", "Cookie"],
  allowMethods: ["POST", "GET", "OPTIONS"],
  exposeHeaders: ["Content-Length", "Set-Cookie"],
  maxAge: 600,
  credentials: true,
});

// CORS middleware for API and RPC endpoints
export const apiCorsMiddleware = cors({
  origin: env.CORS_ORIGIN || "",
  allowMethods: ["GET", "POST", "OPTIONS"],
  allowHeaders: [
    "Content-Type",
    "Authorization",
    "x-tenant-id",
    "x-tenant-slug",
  ],
  credentials: true,
});
