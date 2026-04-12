"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";

export default function RegisterPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const registerMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Registration failed");
      }

      return result;
    },

    onSuccess: (data) => {
      setUser(data.user);
      router.push("/dashboard");
    },
  });

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    registerMutation.mutate(data);
  }

  return (
    <div>
      {registerMutation.isError && (
        <div>{(registerMutation.error as Error).message}</div>
      )}

      {registerMutation.isSuccess && (
        <div>🎉 Registration successful! Redirecting...</div>
      )}

      <form onSubmit={onSubmit}>
        <input name="name" required />
        <input name="email" required />
        <input name="password" type="password" required />

        <button
          type="submit"
          disabled={registerMutation.isPending || registerMutation.isSuccess}
        >
          {registerMutation.isPending ? "Processing..." : "Create Account"}
        </button>
      </form>

      <Link href="/login">Sign in</Link>
    </div>
  );
}