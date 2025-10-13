import { localizeHref } from "@/paraglide/runtime.js";

export const prerenderRoutes = ["/", "/terms", "/privacy"].map((path) => ({
  path: localizeHref(path),
  prerender: {
    enabled: true,
  },
}));
