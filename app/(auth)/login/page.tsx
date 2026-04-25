"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const supabase = createClient();

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setIsLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  async function handleGoogleLogin() {
    const supabase = createClient();

    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (authError) {
      setError(authError.message);
    }
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
        Welcome back to<br />Trackerezz
      </h1>

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

        {error && (
          <div className="text-sm text-red-500 bg-red-50 p-3 rounded-lg border border-red-100 italic">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 rounded-xl bg-[#7C3AED] text-white font-bold text-lg hover:bg-[#6D28D9] transition-colors disabled:opacity-50 shadow-lg shadow-[#7C3AED]/30"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <p className="text-center text-[10px] text-zinc-400 flex items-center justify-center gap-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          YOUR DATA IS NEVER SHARED WITH ANY THIRD PARTY
        </p>
      </form>

      <div className="mt-10 text-center space-y-4">
        <p className="text-sm text-zinc-500">
          Don&apos;t have an account? <Link href="/register" className="font-bold text-zinc-900 hover:text-[#7C3AED]">Sign up</Link>
        </p>
      </div>
    </div>
  );
}