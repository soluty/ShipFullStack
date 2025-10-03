import { AuthView } from "@daveyplate/better-auth-ui";
import { createFileRoute } from "@tanstack/react-router";
// import SignInForm from "@/components/sign-in-form";
// import SignUpForm from "@/components/sign-up-form";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex grow flex-col items-center justify-center gap-3 p-main">
      <AuthView />
    </main>
  );
}
