import { ORPCError, os } from "@orpc/server";
import type { Context } from "./context";

export const o = os.$context<Context>();

export const publicProcedure = o;

const requireAuth = o.middleware(({ context, next }) => {
  if (!context.session?.user) {
    throw new ORPCError("UNAUTHORIZED");
  }
  return next();
});

const requireTenantAccess = o.middleware(({ context, next }) => {
  if (!context.tenant) {
    throw new ORPCError("BAD_REQUEST", { message: "Tenant is required" });
  }

  if (!context.tenantMembership) {
    throw new ORPCError("FORBIDDEN");
  }

  return next();
});

export const protectedProcedure = publicProcedure.use(requireAuth);
export const tenantProcedure = protectedProcedure.use(requireTenantAccess);
