import { AuthView } from "@daveyplate/better-auth-ui";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/auth/$authView")({
  component: RouteComponent,
});

function RouteComponent() {
  const { authView } = Route.useParams();

  const isSignUp = authView === "sign-up";

  return (
    <main className="flex grow flex-col items-center justify-center gap-20 self-center p-4 md:p-6">
      <AuthView pathname={authView} />
      {isSignUp && (
        <p className="text-center text-muted-foreground text-xs">
          By clicking continue, you agree to our{" "}
          <Link
            className="underline underline-offset-4 transition-colors hover:text-primary"
            to="/{-$locale}/terms"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            className="underline underline-offset-4 transition-colors hover:text-primary"
            to="/{-$locale}/privacy"
          >
            Privacy Policy
          </Link>
        </p>
      )}
    </main>
  );
}
