import type { RouterClient } from "@orpc/server";
import { publicProcedure, tenantProcedure } from "../lib/orpc";

export const appRouter = {
  healthCheck: publicProcedure.handler(() => "OK"),
  privateData: tenantProcedure.handler(({ context }) => ({
    message: "This is private",
    user: context.session?.user,
    tenant: context.tenant,
    tenantMembership: context.tenantMembership,
  })),
};
export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
