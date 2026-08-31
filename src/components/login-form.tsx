"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  FieldDescription,
} from "@/components/ui/field";
import { createClient } from "@/lib/supabase/client";
import { useSearchParams } from "next/navigation";
import { LifeOsIcon } from "./icons/life-os-icon";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const handleGoogleLogin = async () => {
    setError(null);
    setIsGoogleLoading(true);

    const redirectTo = searchParams.get("redirectTo") ?? "/dashboard";
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
      },
    });

    if (error) {
      setError(error.message);
      setIsGoogleLoading(false);
    }
    // On success, browser redirects to Google – no need to reset loading
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex size-12 items-center justify-center rounded-lg bg-blue-600 text-white">
          <LifeOsIcon className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-bold text-white">Welcome to LifeOS</h1>
        <FieldDescription className="text-white/50">
          Sign in with your Google account to continue.
        </FieldDescription>
      </div>

      {error && <p className="text-sm text-red-400 text-center">{error}</p>}

      <Button
        variant="outline"
        type="button"
        onClick={handleGoogleLogin}
        disabled={isGoogleLoading}
        className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-blue-500/50 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-5 h-5 mr-2"
        >
          <path
            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
            fill="currentColor"
          />
        </svg>
        {isGoogleLoading ? "Redirecting..." : "Continue with Google"}
      </Button>

      <FieldDescription className="text-center text-white/30 text-xs">
        By clicking continue, you agree to our{" "}
        <a href="#" className="text-blue-400 hover:text-blue-300 transition">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="text-blue-400 hover:text-blue-300 transition">
          Privacy Policy
        </a>
        .
      </FieldDescription>
    </div>
  );
}