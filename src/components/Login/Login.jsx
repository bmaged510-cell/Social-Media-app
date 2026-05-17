import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as zod from "zod";
import { AuthContext } from "../../Context/AuthContext";
import { Helmet } from "react-helmet";

const schema = zod.object({
  email: zod.string().email("Invalid email address").regex(/^\S+@\S+$/i, "Invalid email address").nonempty("Email input is required"),
  password: zod.string().regex(/^(?=.*[A-Za-z])(?=.*\d)/, "Password must be at least 8 characters long and contain at least one letter and one number").nonempty("Password input is required"),
});

function BgLight() {
  return (
    <svg viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="lBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
        <linearGradient id="lLayer1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
        <linearGradient id="lLayer2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#b0bec5" />
        </linearGradient>
        <linearGradient id="lLayer3" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#f1f5f9" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
        <filter id="lGlowBlur"><feGaussianBlur stdDeviation="6" /></filter>
        <filter id="lBlur"><feGaussianBlur stdDeviation="40" /></filter>
      </defs>
      <rect width="1440" height="900" fill="url(#lBg)" />
      <polygon points="600,0 1440,0 1440,900 800,900" fill="url(#lLayer1)" opacity="0.7" />
      <polygon points="750,0 1440,0 1440,900 1000,900" fill="url(#lLayer2)" opacity="0.6" />
      <polygon points="950,0 1440,0 1440,900 1200,900" fill="url(#lLayer3)" opacity="0.8" />
      <line x1="600" y1="0" x2="800" y2="900" stroke="#f97316" strokeWidth="18" filter="url(#lGlowBlur)" opacity="0.5" />
      <line x1="600" y1="0" x2="800" y2="900" stroke="#f97316" strokeWidth="2.5" opacity="0.9" />
      <line x1="750" y1="0" x2="1000" y2="900" stroke="#fb923c" strokeWidth="14" filter="url(#lGlowBlur)" opacity="0.45" />
      <line x1="750" y1="0" x2="1000" y2="900" stroke="#fb923c" strokeWidth="2" opacity="0.8" />
      <line x1="950" y1="0" x2="1200" y2="900" stroke="#f97316" strokeWidth="10" filter="url(#lGlowBlur)" opacity="0.35" />
      <line x1="950" y1="0" x2="1200" y2="900" stroke="#f97316" strokeWidth="1.5" opacity="0.7" />
      <ellipse cx="1350" cy="80"  rx="320" ry="180" fill="#f97316" opacity="0.06" filter="url(#lBlur)" />
      <ellipse cx="1100" cy="520" rx="260" ry="320" fill="#fb923c" opacity="0.05" filter="url(#lBlur)" />
    </svg>
  );
}

function BgDark() {
  return (
    <svg viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="dBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#0a0a0a" />
          <stop offset="100%" stopColor="#141414" />
        </linearGradient>
        <linearGradient id="dLayer1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#111111" />
        </linearGradient>
        <linearGradient id="dLayer2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#222222" />
          <stop offset="100%" stopColor="#161616" />
        </linearGradient>
        <linearGradient id="dLayer3" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#1c1c1c" />
          <stop offset="100%" stopColor="#0f0f0f" />
        </linearGradient>
        <filter id="dGlowBlur"><feGaussianBlur stdDeviation="7" /></filter>
        <filter id="dBlur"><feGaussianBlur stdDeviation="40" /></filter>
      </defs>
      <rect width="1440" height="900" fill="url(#dBg)" />
      <polygon points="600,0 1440,0 1440,900 800,900" fill="url(#dLayer1)" />
      <polygon points="750,0 1440,0 1440,900 1000,900" fill="url(#dLayer2)" />
      <polygon points="950,0 1440,0 1440,900 1200,900" fill="url(#dLayer3)" />
      <line x1="600" y1="0" x2="800" y2="900" stroke="#ef4444" strokeWidth="18" filter="url(#dGlowBlur)" opacity="0.6" />
      <line x1="600" y1="0" x2="800" y2="900" stroke="#ff6b6b" strokeWidth="1.2" opacity="0.95" />
      <line x1="750" y1="0" x2="1000" y2="900" stroke="#dc2626" strokeWidth="14" filter="url(#dGlowBlur)" opacity="0.55" />
      <line x1="750" y1="0" x2="1000" y2="900" stroke="#f87171" strokeWidth="1" opacity="0.9" />
      <line x1="950" y1="0" x2="1200" y2="900" stroke="#ef4444" strokeWidth="10" filter="url(#dGlowBlur)" opacity="0.45" />
      <line x1="950" y1="0" x2="1200" y2="900" stroke="#fca5a5" strokeWidth="0.8" opacity="0.85" />
      <ellipse cx="1350" cy="80"  rx="320" ry="180" fill="#ef4444" opacity="0.07" filter="url(#dBlur)" />
      <ellipse cx="1100" cy="520" rx="260" ry="320" fill="#dc2626" opacity="0.06" filter="url(#dBlur)" />
    </svg>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const [apiError, setapiError] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const { userLogin, setuserLogin } = useContext(AuthContext);

  if (userLogin) {
    navigate("/");
  }

  const form = useForm({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const { register, handleSubmit, formState } = form;

  function handleLogin(values) {
    setisLoading(true);
    axios
      .post(`https://route-posts.routemisr.com/users/signin`, values)
      .then((res) => {
        if (res.data.success === true) {
          localStorage.setItem("UserToken", res.data.data.token);
          setuserLogin(res.data.data.token);
          navigate("/");
        }
      })
      .catch((error) => {
        setapiError(error.response.data.message);
      })
      .finally(() => {
        setisLoading(false);
      });
  }

  return (
    <>
      <Helmet>
        <title>Login page</title>
      </Helmet>

      <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-4 py-10">

        <div className="absolute inset-0 z-0 block dark:hidden">
          <BgLight />
        </div>

        <div className="absolute inset-0 z-0 hidden dark:block">
          <BgDark />
        </div>

        <div className="relative z-10 w-full max-w-sm">
          <div className="bg-white/30 dark:bg-white/[0.04] backdrop-blur-2xl border border-white/60 dark:border-white/[0.08] rounded-3xl p-8 shadow-[0_8px_48px_rgba(0,0,0,0.10)] dark:shadow-[0_8px_48px_rgba(0,0,0,0.70)]">

            <div className="mb-8 text-center">
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 bg-gradient-to-br from-orange-400 to-rose-500 dark:from-red-600 dark:to-rose-800 shadow-lg shadow-orange-300/40 dark:shadow-red-900/70">
                <svg viewBox="0 0 40 40" className="w-9 h-9 text-white" fill="none">
                  <circle cx="20" cy="20" r="18" stroke="white" strokeWidth="1.5" strokeOpacity="0.25" />
                  <path d="M12 10h9c3.8 0 6.2 2.4 6.2 5.8 0 2.8-1.8 4.8-4.5 5.4L28 30h-5l-4.5-8.4H17V30h-5V10z" fill="white" />
                </svg>
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-yellow-300 dark:bg-red-400 border-2 border-white dark:border-[#0a0a0a]" />
              </div>

              <h1 className="text-[28px] font-black tracking-tight text-gray-800 dark:text-white">
                Welcome to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500 dark:from-red-400 dark:to-rose-400">
                  Rivo
                </span>
              </h1>
              <p className="text-gray-500 dark:text-white/35 text-[13px] mt-1.5 font-light tracking-wide">
                Sign in to continue your journey
              </p>
            </div>

            {apiError && (
              <div className="mb-5 px-4 py-3 bg-rose-50 dark:bg-red-500/10 border border-rose-200 dark:border-red-500/20 rounded-xl">
                <p className="text-rose-500 dark:text-red-400 text-sm font-medium text-center">
                  {apiError}
                </p>
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>

              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-[11px] font-bold tracking-widest uppercase text-gray-500 dark:text-white/35">
                  Email
                </label>
                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 text-sm rounded-xl outline-none transition-all duration-200 bg-white/60 dark:bg-white/[0.06] border border-white/70 dark:border-white/[0.09] text-gray-800 dark:text-white/85 placeholder:text-gray-400 dark:placeholder:text-white/20 focus:border-orange-400 dark:focus:border-red-500 focus:ring-2 focus:ring-orange-200/50 dark:focus:ring-red-500/20 backdrop-blur-sm"
                />
                {formState.errors.email && formState.touchedFields.email && (
                  <p className="text-rose-500 dark:text-red-400 text-xs ml-1 font-medium">
                    {formState.errors.email?.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="password" className="block text-[11px] font-bold tracking-widest uppercase text-gray-500 dark:text-white/35">
                  Password
                </label>
                <input
                  {...register("password")}
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 text-sm rounded-xl outline-none transition-all duration-200 bg-white/60 dark:bg-white/[0.06] border border-white/70 dark:border-white/[0.09] text-gray-800 dark:text-white/85 placeholder:text-gray-400 dark:placeholder:text-white/20 focus:border-orange-400 dark:focus:border-red-500 focus:ring-2 focus:ring-orange-200/50 dark:focus:ring-red-500/20 backdrop-blur-sm"
                />
                {formState.errors.password && formState.touchedFields.password && (
                  <p className="text-rose-500 dark:text-red-400 text-xs ml-1 font-medium">
                    {formState.errors.password?.message}
                  </p>
                )}
              </div>

              <button
                disabled={isLoading}
                type="submit"
                className="w-full mt-2 py-3 px-4 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-rose-500 dark:from-red-600 dark:to-rose-700 hover:from-orange-400 hover:to-rose-400 dark:hover:from-red-500 dark:hover:to-rose-600 active:scale-[0.98] rounded-xl shadow-lg shadow-orange-200 dark:shadow-red-900/60 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-300 dark:focus:ring-red-500/30"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}