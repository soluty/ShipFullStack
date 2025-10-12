import { AuthView } from "@daveyplate/better-auth-ui";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/$authView")({
  component: RouteComponent,
});

function RouteComponent() {
  const { authView } = Route.useParams();

  const isSignUp = authView === "sign-up";

  return (
    <main className="container flex grow flex-col items-center justify-center gap-20 self-center p-4 md:p-6">
      <AuthView pathname={authView} />
      {isSignUp && (
        <p className="text-center text-muted-foreground text-xs">
          By clicking continue, you agree to our{" "}
          <a
            className="underline underline-offset-4 transition-colors hover:text-primary"
            href="/terms"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            className="underline underline-offset-4 transition-colors hover:text-primary"
            href="/privacy"
          >
            Privacy Policy
          </a>
        </p>
      )}
    </main>
  );
}
