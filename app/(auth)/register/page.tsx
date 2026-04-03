"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);

  async function onSubmit(event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    event.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccess(false);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        // Handle specific validation errors from Zod safely
        if (result.errors) {
          const firstError = Object.values(result.errors)[0] as string[];
          setErrorMsg(firstError[0] || "Validation failed check inputs.");
        } else {
          setErrorMsg(result.message || "An unknown error occurred.");
        }
      } else {
        setSuccess(true);
        // Briefly pause so user sees success message, then redirect out
        setTimeout(() => {
          router.push("/dashboard"); 
        }, 2000);
      }
    } catch (err: any) {
      setErrorMsg("Failed to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-emerald-500/5">
      <div className="p-8">
        
        {/* Header styling */}
        <div className="text-center mb-8 space-y-2">
          <div className="w-12 h-12 bg-gradient-to-tr from-emerald-500 to-emerald-400 rounded-xl mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-4">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
            Apply Tracker
          </h1>
          <p className="text-zinc-400 text-sm">
            Create an account to track your job applications seamlessly.
          </p>
        </div>

        {/* State Banners */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm animate-in fade-in slide-in-from-top-2">
            {errorMsg}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm animate-in fade-in slide-in-from-top-2 flex items-center gap-2">
            <span>🎉 Registration successful! Redirecting...</span>
          </div>
        )}

        {/* The Form */}
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="space-y-1 group">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-zinc-300 transition-colors group-focus-within:text-emerald-400"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Elon Musk"
              autoComplete="name"
              required
              className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
            />
          </div>

          <div className="space-y-1 group">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-300 transition-colors group-focus-within:text-emerald-400"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="elon@spacex.com"
              autoComplete="email"
              required
              className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
            />
          </div>

          <div className="space-y-1 group">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-zinc-300 transition-colors group-focus-within:text-emerald-400"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              autoComplete="new-password"
              required
              className="w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300"
            />
          </div>

          <button
            type="submit"
            disabled={loading || success}
            className="group relative w-full flex justify-center py-3 px-4 rounded-xl text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-emerald-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
          >
            {/* Soft button gleam effect */}
            <div className="absolute inset-0 w-full h-full -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
            
            <span className="relative flex items-center gap-2">
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Create Account"
              )}
            </span>
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-zinc-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}