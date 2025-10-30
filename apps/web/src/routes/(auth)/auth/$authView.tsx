import { AuthView } from "@daveyplate/better-auth-ui";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { authClient } from "@/lib/auth/auth-client";

export const Route = createFileRoute("/(auth)/auth/$authView")({
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
  const callbackUrl = `${appUrl}/auth/callback`;

  return (
    <main className="flex grow flex-col items-center justify-center gap-4 self-center p-4 md:p-6">
      <AuthView
        callbackURL={callbackUrl}
        localization={{
          SIGN_IN: "登录",
          SIGN_IN_DESCRIPTION: "在下方输入您的邮箱以登录您的账户",
          EMAIL: "邮箱",
          PASSWORD: "密码",
          FORGOT_PASSWORD_LINK: "忘记密码？",
          SIGN_IN_ACTION: "登录",
          OR_CONTINUE_WITH: "或使用以下方式登录",
          DONT_HAVE_AN_ACCOUNT: "还没有账户？",
          SIGN_UP: "注册",
          SIGN_UP_DESCRIPTION: "输入您的信息以创建账户",
          SIGN_UP_ACTION: "注册",
          ALREADY_HAVE_AN_ACCOUNT: "已有账户？",
          SIGN_IN_WITH: "使用以下方式登录",
        }}
      />
      {isSignUp && (
        <p className="text-center text-muted-foreground text-xs">
          点击继续即表示您同意我们的{" "}
          <Link
            className="underline underline-offset-4 transition-colors hover:text-primary"
            to="/terms"
          >
            服务条款
          </Link>{" "}
          和{" "}
          <Link
            className="underline underline-offset-4 transition-colors hover:text-primary"
            to="/privacy"
          >
            隐私政策
          </Link>
        </p>
      )}
    </main>
  );
}
