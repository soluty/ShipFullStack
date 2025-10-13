import { AuthView } from "@daveyplate/better-auth-ui";
import { createFileRoute, Link } from "@tanstack/react-router";
import { m } from "@/paraglide/messages";

export const Route = createFileRoute("/auth/$authView")({
  component: RouteComponent,
});

function RouteComponent() {
  const { authView } = Route.useParams();

  const isSignUp = authView === "sign-up";

  return (
    <main className="flex grow flex-col items-center justify-center gap-20 self-center p-4 md:p-6">
      <AuthView
        localization={{
          SIGN_IN: m["auth.login.sign_in"](),
        }}
        pathname={authView}
      />
      {isSignUp && (
        <p className="text-center text-muted-foreground text-xs">
          By clicking continue, you agree to our{" "}
          <Link
            className="underline underline-offset-4 transition-colors hover:text-primary"
            to="/terms"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            className="underline underline-offset-4 transition-colors hover:text-primary"
            to="/privacy"
          >
            Privacy Policy
          </Link>
        </p>
      )}
    </main>
  );
}
