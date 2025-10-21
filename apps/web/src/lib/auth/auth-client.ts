import { redirect } from "@tanstack/react-router";
import { createAuthClient } from "better-auth/react";
import { toast } from "sonner";

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

/**
 * Sign out the user
 * @returns Promise<void>
 */
export const signOut = () => {
  authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        console.log("Sign out successfully");
        toast.success("Sign out successfully");
        redirect({
          to: "/",
        });
      },
      onError: (error) => {
        console.error(error);
        toast.error(error.error.message || error.error.statusText);
      },
    },
  });
};
