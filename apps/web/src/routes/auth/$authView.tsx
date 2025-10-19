import { AuthView } from "@daveyplate/better-auth-ui";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { authClient } from "@/lib/auth/auth-client";
import { m } from "@/paraglide/messages";
import { localizeHref } from "@/paraglide/runtime";

export const Route = createFileRoute("/auth/$authView")({
  beforeLoad: async () => {
    const session = await authClient.getSession();
    if (session.data?.user) {
      redirect({
        to: "/dashboard",
        throw: true,
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { authView } = Route.useParams();

  const isSignUp = authView === "sign-up";

  // Build full callback URL for OAuth redirects
  const appUrl = import.meta.env.VITE_APP_URL || window.location.origin;
  const callbackUrl = `${appUrl}${localizeHref("/auth/callback")}`;

  return (
    <main className="flex grow flex-col items-center justify-center gap-4 self-center p-4 md:p-6">
      <AuthView
        callbackURL={callbackUrl}
        localization={{
          SIGN_IN: m["auth.login.sign_in"](),
          SIGN_IN_DESCRIPTION: m["auth.login.description"](),
          EMAIL: m["auth.login.email"](),
          PASSWORD: m["auth.login.password"](),
          FORGOT_PASSWORD_LINK: m["auth.login.forgot_password"](),
          SIGN_IN_ACTION: m["auth.login.sign_in"](),
          OR_CONTINUE_WITH: m["auth.login.or_continue_with"](),
          DONT_HAVE_AN_ACCOUNT: m["auth.login.dont_have_an_account"](),
          SIGN_UP: m["auth.sign_up.sign_up"](),
          SIGN_UP_DESCRIPTION: m["auth.sign_up.description"](),
          SIGN_UP_ACTION: m["auth.sign_up.register"](),
          ALREADY_HAVE_AN_ACCOUNT: m["auth.sign_up.already_have_an_account"](),
          SIGN_IN_WITH: m["auth.sign_up.sign_in_with"](),
        }}
      />
      {isSignUp && (
        <p className="text-center text-muted-foreground text-xs">
          {m["auth.sign_up.clicking_continue"]()}{" "}
          <Link
            className="underline underline-offset-4 transition-colors hover:text-primary"
            to="/terms"
          >
            {m["auth.sign_up.terms_of_service"]()}
          </Link>{" "}
          {m["auth.sign_up.and"]()}{" "}
          <Link
            className="underline underline-offset-4 transition-colors hover:text-primary"
            to="/privacy"
          >
            {m["auth.sign_up.privacy_policy"]()}
          </Link>
        </p>
      )}
    </main>
  );
}
