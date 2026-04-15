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
    <div className="bg-white rounded-[40px] p-8 xl:p-16 shadow-2xl flex flex-col items-center">
      {/* Brand Logo */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-[#7C3AED] rounded-lg flex items-center justify-center">
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 11 4-7"></path><path d="m19 11-4-7"></path><path d="M2 11h20"></path><path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4"></path><path d="m9 11 1 9"></path><path d="M15 11l-1 9"></path></svg>
        </div>
        <span className="text-2xl font-bold tracking-tight text-zinc-900">eztrackr</span>
      </div>

      <h1 className="text-3xl xl:text-4xl font-bold text-center text-zinc-900 mb-10 leading-tight">
        Welcome back to<br />Eztrackr
      </h1>

      {/* Social Login */}
      <button 
        type="button"
        className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-zinc-200 rounded-xl text-zinc-700 font-medium hover:bg-zinc-50 transition-colors mb-6"
      >
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Continue with Google
      </button>

      {/* Divider */}
      <div className="w-full flex items-center gap-4 mb-8">
        <div className="flex-1 h-px bg-zinc-100" />
        <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">or</span>
        <div className="flex-1 h-px bg-zinc-100" />
      </div>

      <form onSubmit={onSubmit} className="w-full space-y-6">
        <div>
          <label className="block text-sm font-medium text-zinc-500 mb-2 ml-1">Email</label>
          <input 
            name="email" 
            type="email"
            placeholder="Enter your email"
            required 
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-500 mb-2 ml-1">Password</label>
          <input 
            name="password" 
            type="password" 
            placeholder="••••••••"
            required 
            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] transition-all"
          />
        </div>

        {loginMutation.isError && (
          <div className="text-sm text-red-500 bg-red-50 p-3 rounded-lg border border-red-100 italic">
            {(loginMutation.error as Error).message}
          </div>
        )}

        <button
          type="submit"
          disabled={loginMutation.isPending || loginMutation.isSuccess}
          className="w-full py-4 rounded-xl bg-[#7C3AED] text-white font-bold text-lg hover:bg-[#6D28D9] transition-colors disabled:opacity-50 shadow-lg shadow-[#7C3AED]/30"
        >
          {loginMutation.isPending ? "Logging in..." : loginMutation.isSuccess ? "Redirecting..." : "Login"}
        </button>

        <p className="text-center text-[10px] text-zinc-400 flex items-center justify-center gap-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          YOUR DATA IS NEVER SHARED WITH ANY THIRD PARTY
        </p>
      </form>

      <div className="mt-10 text-center space-y-4">
        <p className="text-sm text-zinc-500">
          Don't have an account? <Link href="/register" className="font-bold text-zinc-900 hover:text-[#7C3AED]">Sign up</Link>
        </p>
        <Link href="/privacy" className="block text-[10px] text-zinc-400 hover:underline">Privacy Policy</Link>
      </div>
    </div>
  );
}