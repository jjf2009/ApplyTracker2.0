"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const loginMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      return result;
    },

    onSuccess: (data) => {
      setUser(data.user); // save user globally
      router.push("/dashboard");
    },
  });

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    loginMutation.mutate(data);
  }

  return (
    <div>
      {loginMutation.isError && (
        <div>{(loginMutation.error as Error).message}</div>
      )}

      {loginMutation.isSuccess && (
        <div>
          <span>Login successful</span>
        </div>
      )}

      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="elon@spacex.com"
            autoComplete="email"
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loginMutation.isPending || loginMutation.isSuccess}
        >
          {loginMutation.isPending ? "Processing..." : "Login"}
        </button>
      </form>

      <div>
        <p>
          Don't have an account? <Link href="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
}