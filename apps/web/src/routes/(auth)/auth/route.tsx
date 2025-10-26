import { IconArrowLeft } from "@tabler/icons-react";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/(auth)/auth")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-screen flex-1 p-4">
      {/* back button */}
      <Link to="/">
        <Button variant="outline">
          <IconArrowLeft />
        </Button>
      </Link>
      <Outlet />
    </div>
  );
}
