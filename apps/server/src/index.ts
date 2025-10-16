import { env } from "cloudflare:workers";
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";
import { onError } from "@orpc/server";
import { RPCHandler } from "@orpc/server/fetch";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { auth } from "./lib/auth";
import { createContext } from "./lib/context";
import { appRouter } from "./routers/index";

const app = new Hono();

const TENANT_ROUTE_SEGMENTS = new Set(["api", "rpc"]);

const stripTenantPrefixFromRequest = (request: Request): Request => {
  const url = new URL(request.url);
  const segments = url.pathname.split("/").filter(Boolean);

  if (segments.length < 2) {
    return request;
  }

  const [firstSegment, secondSegment] = segments;

  if (TENANT_ROUTE_SEGMENTS.has(firstSegment)) {
    return request;
  }

  if (!TENANT_ROUTE_SEGMENTS.has(secondSegment)) {
    return request;
  }

  const updatedUrl = new URL(url.toString());
  updatedUrl.pathname = `/${segments.slice(1).join("/")}`;

  return new Request(updatedUrl.toString(), request);
};

app.use(logger());
app.use(
  "/*",
  cors({
    // origin: process.env.CORS_ORIGIN || "",
    origin: env.CORS_ORIGIN || "",
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: [
      "Content-Type",
      "Authorization",
      "x-tenant-id",
      "x-tenant-slug",
    ],
    credentials: true,
  })
);

// better auth handler
app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

export const apiHandler = new OpenAPIHandler(appRouter, {
  plugins: [
    new OpenAPIReferencePlugin({
      schemaConverters: [new ZodToJsonSchemaConverter()],
    }),
  ],
  interceptors: [
    onError((error) => {
      console.error(error);
    }),
  ],
});

export const rpcHandler = new RPCHandler(appRouter, {
  interceptors: [
    onError((error) => {
      console.error(error);
    }),
  ],
});

app.use("/*", async (c, next) => {
  const context = await createContext({ context: c });
  const normalizedRequest = stripTenantPrefixFromRequest(c.req.raw);

  const rpcResult = await rpcHandler.handle(normalizedRequest, {
    prefix: "/rpc",
    context,
  });

  if (rpcResult.matched) {
    return c.newResponse(rpcResult.response.body, rpcResult.response);
  }

  const apiResult = await apiHandler.handle(normalizedRequest, {
    prefix: "/api",
    context,
  });

  if (apiResult.matched) {
    return c.newResponse(apiResult.response.body, apiResult.response);
  }

  await next();
});

app.get("/", (c) => c.text("OK"));

export default app;
