import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/privacy")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>隐私政策</div>;
}
