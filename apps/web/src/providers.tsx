import { AuthQueryProvider } from "@daveyplate/better-auth-tanstack";
import { AuthUIProviderTanstack } from "@daveyplate/better-auth-ui/tanstack";
import { QueryClientProvider } from "@tanstack/react-query";
import { Link, useRouter } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { authClient } from "@/lib/auth/auth-client";
import { queryClient } from "@/utils/orpc";

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthQueryProvider>
        <AuthUIProviderTanstack
          authClient={authClient}
          Link={({ href, ...props }) => <Link to={href} {...props} />}
          navigate={(href) => router.navigate({ href })}
          replace={(href) => router.navigate({ href, replace: true })}
          social={{ providers: ["github", "google", "facebook"] }}
        >
          {children}
        </AuthUIProviderTanstack>
      </AuthQueryProvider>
    </QueryClientProvider>
  );
}
