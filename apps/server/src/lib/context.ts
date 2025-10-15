import type { Context as HonoContext } from "hono";
import { auth } from "./auth";
import { resolveTenantContext } from "./tenant";

export type CreateContextOptions = {
  context: HonoContext;
};

export async function createContext({ context }: CreateContextOptions) {
  const session = await auth.api.getSession({
    headers: context.req.raw.headers,
  });
  const tenantContext = await resolveTenantContext({
    request: context.req.raw,
    sessionUserId: session?.user?.id,
  });

  return {
    session,
    ...tenantContext,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
