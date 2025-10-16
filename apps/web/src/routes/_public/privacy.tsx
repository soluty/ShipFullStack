import { createFileRoute } from "@tanstack/react-router";
import { m } from "@/paraglide/messages";

export const Route = createFileRoute("/_public/privacy")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>{m.example_message({ username: "privacy" })}</div>;
}
