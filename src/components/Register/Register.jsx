
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as zod from "zod";
import { Helmet } from "react-helmet";

const schema = zod
  .object({
    name: zod
      .string()
      .nonempty("Name input is required")
      .min(3, "Name must be at least 3 characters")
      .max(5, "Name must be less than 5 characters"),
    email: zod
      .string()
      .email("Invalid email address")
      .regex(/^\S+@\S+$/i, "Invalid email address")
      .nonempty("Email input is required"),
    password: zod
      .string()
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)/,
        "Password must be at least 8 characters long and contain at least one letter and one number",
      )
      .nonempty("Password input is required"),
    rePassword: zod.string().nonempty("Confirm password input is required"),
    dateOfBirth: zod.coerce
      .date()
      .refine((dateValue) => {
        const userDate = dateValue.getFullYear();
        const currentDate = new Date().getFullYear();
        return currentDate - userDate >= 10;
      }, "You must be 10 years or older")
      .transform(
        (date) =>
          `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
      ),
    gender: zod.enum(["male", "female"], "Please select your gender"),
  })
  .refine((object) => (object.password === object.rePassword ? true : false), {
    error: "Passwords do not match",
    path: ["rePassword"],
  });

const ErrorIcon = () => (
  <svg
    className="w-3 h-3 flex-shrink-0"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
      clipRule="evenodd"
    />
  </svg>
);

export default function Register() {
  const navigate = useNavigate();
  const [apiError, setapiError] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const { register, handleSubmit, formState } = form;
  console.log(formState.errors);

  function handleRegister(values) {
    setisLoading(true);
    axios
      .post(`https://route-posts.routemisr.com/users/signup`, values)
      .then((res) => {
        console.log(res.data);
        if (res.data.message === "account created") navigate("/login");
      })
      .catch((error) => {
        console.log(error.response.data);
        setapiError(error.response.data.error);
      })
      .finally(() => setisLoading(false));
  }

  const inputClass =
    "w-full px-4 py-3 text-sm text-gray-800 dark:text-white/90 bg-white/50 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.08] rounded-2xl placeholder:text-gray-300 dark:placeholder:text-white/20 outline-none focus:border-orange-400 dark:focus:border-red-500/80 focus:ring-4 focus:ring-orange-100 dark:focus:ring-red-500/10 hover:border-gray-300 dark:hover:border-white/[0.14] hover:bg-white/70 dark:hover:bg-white/[0.06] backdrop-blur-sm transition-all duration-300 font-light tracking-wide";
  const labelClass =
    "block text-[10px] font-bold tracking-[0.18em] uppercase text-gray-400 dark:text-white/30 mb-2 ml-0.5";
  const errorClass =
    "flex items-center gap-1 text-rose-400 dark:text-red-400/90 text-[11px] ml-1 mt-1.5 font-normal tracking-wide";
  const fieldClass = "relative w-full mb-5 group";

  return (
    <>
      <Helmet>
        <title>Register page</title>
      </Helmet>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        .rivo-root  { font-family: 'DM Sans', sans-serif; }
        .rivo-title { font-family: 'Syne', sans-serif; }
        .rivo-heading { font-family: 'Playfair Display', serif; }

        @keyframes fadeSlideUp {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity:0; transform:scale(0.85); }
          to   { opacity:1; transform:scale(1); }
        }
        @keyframes float {
          0%,100% { transform:translateY(0); }
          50%     { transform:translateY(-6px); }
        }
        @keyframes lineGrow {
          from { stroke-dashoffset:1800; }
          to   { stroke-dashoffset:0; }
        }
        @keyframes shimmer {
          0%   { background-position:-200% center; }
          100% { background-position:200% center; }
        }

        .anim-card  { animation: fadeSlideUp .7s cubic-bezier(.22,1,.36,1) both; }
        .anim-logo  { animation: scaleIn .6s cubic-bezier(.34,1.56,.64,1) .1s both; }
        .anim-title { animation: fadeSlideUp .55s ease .2s both; }
        .anim-form  { animation: fadeSlideUp .55s ease .3s both; }
        .anim-bg    { animation: fadeSlideUp 1.1s ease both; }

        .anim-field                { animation: fadeSlideUp .45s ease both; }
        .anim-field:nth-child(1)   { animation-delay:.38s; }
        .anim-field:nth-child(2)   { animation-delay:.44s; }
        .anim-field:nth-child(3)   { animation-delay:.50s; }
        .anim-field:nth-child(4)   { animation-delay:.56s; }
        .anim-field:nth-child(5)   { animation-delay:.62s; }
        .anim-field:nth-child(6)   { animation-delay:.68s; }
        .anim-field:nth-child(7)   { animation-delay:.74s; }

        .logo-float { animation: float 4s ease-in-out infinite; }

        .svg-draw line {
          stroke-dasharray: 1800;
          animation: lineGrow 2.2s cubic-bezier(.22,1,.36,1) .2s both;
        }
        .svg-draw line:nth-child(2) { animation-delay:.45s; }
        .svg-draw line:nth-child(4) { animation-delay:.70s; }
        .svg-draw line:nth-child(6) { animation-delay:.95s; }

        .btn-shimmer {
          background-size: 220% auto;
          animation: shimmer 3s linear infinite;
        }

        .glass {
          background: rgba(255,255,255,.28);
          backdrop-filter: blur(36px) saturate(180%);
          -webkit-backdrop-filter: blur(36px) saturate(180%);
        }
        .dark .glass {
          background: rgba(255,255,255,.035);
          backdrop-filter: blur(36px) saturate(120%);
          -webkit-backdrop-filter: blur(36px) saturate(120%);
        }

        .field-glow { position: relative; }
        .field-glow::after {
          content:'';
          position:absolute;
          bottom:0; left:14px; right:14px;
          height:1px;
          background:linear-gradient(90deg,transparent,#f97316,transparent);
          opacity:0;
          border-radius:999px;
          transition:opacity .3s;
        }
        .field-glow:focus-within::after { opacity:1; }

        .radio-pill input[type="radio"] {
          appearance:none; width:17px; height:17px;
          border:2px solid #d1d5db;
          border-radius:50%;
          cursor:pointer;
          position:relative;
          transition:all .2s;
          flex-shrink:0;
        }
        .radio-pill input[type="radio"]:checked {
          border-color:#f97316;
          background:#f97316;
          box-shadow:0 0 0 3px rgba(249,115,22,.18);
        }
        .dark .radio-pill input[type="radio"] { border-color:rgba(255,255,255,.15); }
        .dark .radio-pill input[type="radio"]:checked {
          border-color:#ef4444;
          background:#ef4444;
          box-shadow:0 0 0 3px rgba(239,68,68,.18);
        }
        .radio-pill input[type="radio"]::after {
          content:'';
          position:absolute;
          inset:3px;
          border-radius:50%;
          background:#fff;
          opacity:0;
          transition:opacity .2s;
        }
        .radio-pill input[type="radio"]:checked::after { opacity:1; }

        input[type="date"]::-webkit-calendar-picker-indicator { opacity:.35; cursor:pointer; }
        .dark input[type="date"]::-webkit-calendar-picker-indicator { filter:invert(1); opacity:.25; }

        .divider {
          height:1px;
          margin:4px 0 20px;
          background:linear-gradient(90deg,transparent,rgba(156,163,175,.3),transparent);
        }
        .dark .divider {
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.06),transparent);
        }
      `}</style>

      <div className="rivo-root relative min-h-screen w-full overflow-hidden flex items-start justify-center px-4 pt-24 pb-10">
        {/* Light BG */}
        <div className="anim-bg absolute inset-0 z-0 block dark:hidden">
          <svg
            viewBox="0 0 1440 900"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full svg-draw"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="lBg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="100%" stopColor="#e2e8f0" />
              </linearGradient>
              <linearGradient id="lL1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>
              <linearGradient id="lL2" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#e2e8f0" />
                <stop offset="100%" stopColor="#b0bec5" />
              </linearGradient>
              <linearGradient id="lL3" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f1f5f9" />
                <stop offset="100%" stopColor="#cbd5e1" />
              </linearGradient>
              <filter id="lglow">
                <feGaussianBlur stdDeviation="6" />
              </filter>
              <filter id="lblur">
                <feGaussianBlur stdDeviation="44" />
              </filter>
            </defs>
            <rect width="1440" height="900" fill="url(#lBg)" />
            <polygon
              points="600,0 1440,0 1440,900 800,900"
              fill="url(#lL1)"
              opacity=".70"
            />
            <polygon
              points="750,0 1440,0 1440,900 1000,900"
              fill="url(#lL2)"
              opacity=".60"
            />
            <polygon
              points="950,0 1440,0 1440,900 1200,900"
              fill="url(#lL3)"
              opacity=".80"
            />
            <line
              x1="600"
              y1="0"
              x2="800"
              y2="900"
              stroke="#f97316"
              strokeWidth="18"
              filter="url(#lglow)"
              opacity=".50"
            />
            <line
              x1="600"
              y1="0"
              x2="800"
              y2="900"
              stroke="#f97316"
              strokeWidth="2.5"
              opacity=".90"
            />
            <line
              x1="750"
              y1="0"
              x2="1000"
              y2="900"
              stroke="#fb923c"
              strokeWidth="14"
              filter="url(#lglow)"
              opacity=".42"
            />
            <line
              x1="750"
              y1="0"
              x2="1000"
              y2="900"
              stroke="#fb923c"
              strokeWidth="2"
              opacity=".80"
            />
            <line
              x1="950"
              y1="0"
              x2="1200"
              y2="900"
              stroke="#f97316"
              strokeWidth="10"
              filter="url(#lglow)"
              opacity=".32"
            />
            <line
              x1="950"
              y1="0"
              x2="1200"
              y2="900"
              stroke="#f97316"
              strokeWidth="1.5"
              opacity=".68"
            />
            <ellipse
              cx="1350"
              cy="80"
              rx="320"
              ry="180"
              fill="#f97316"
              opacity=".06"
              filter="url(#lblur)"
            />
            <ellipse
              cx="1100"
              cy="520"
              rx="260"
              ry="320"
              fill="#fb923c"
              opacity=".05"
              filter="url(#lblur)"
            />
          </svg>
        </div>

        {/* Dark BG */}
        <div className="anim-bg absolute inset-0 z-0 hidden dark:block">
          <svg
            viewBox="0 0 1440 900"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full svg-draw"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="dBg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0a0a0a" />
                <stop offset="100%" stopColor="#141414" />
              </linearGradient>
              <linearGradient id="dL1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1a1a1a" />
                <stop offset="100%" stopColor="#111111" />
              </linearGradient>
              <linearGradient id="dL2" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#222222" />
                <stop offset="100%" stopColor="#161616" />
              </linearGradient>
              <linearGradient id="dL3" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1c1c1c" />
                <stop offset="100%" stopColor="#0f0f0f" />
              </linearGradient>
              <filter id="dglow">
                <feGaussianBlur stdDeviation="7" />
              </filter>
              <filter id="dblur">
                <feGaussianBlur stdDeviation="44" />
              </filter>
            </defs>
            <rect width="1440" height="900" fill="url(#dBg)" />
            <polygon points="600,0 1440,0 1440,900 800,900" fill="url(#dL1)" />
            <polygon points="750,0 1440,0 1440,900 1000,900" fill="url(#dL2)" />
            <polygon points="950,0 1440,0 1440,900 1200,900" fill="url(#dL3)" />
            <line
              x1="600"
              y1="0"
              x2="800"
              y2="900"
              stroke="#ef4444"
              strokeWidth="18"
              filter="url(#dglow)"
              opacity=".60"
            />
            <line
              x1="600"
              y1="0"
              x2="800"
              y2="900"
              stroke="#ff6b6b"
              strokeWidth="1.2"
              opacity=".95"
            />
            <line
              x1="750"
              y1="0"
              x2="1000"
              y2="900"
              stroke="#dc2626"
              strokeWidth="14"
              filter="url(#dglow)"
              opacity=".55"
            />
            <line
              x1="750"
              y1="0"
              x2="1000"
              y2="900"
              stroke="#f87171"
              strokeWidth="1"
              opacity=".90"
            />
            <line
              x1="950"
              y1="0"
              x2="1200"
              y2="900"
              stroke="#ef4444"
              strokeWidth="10"
              filter="url(#dglow)"
              opacity=".45"
            />
            <line
              x1="950"
              y1="0"
              x2="1200"
              y2="900"
              stroke="#fca5a5"
              strokeWidth=".8"
              opacity=".85"
            />
            <ellipse
              cx="1350"
              cy="80"
              rx="320"
              ry="180"
              fill="#ef4444"
              opacity=".07"
              filter="url(#dblur)"
            />
            <ellipse
              cx="1100"
              cy="520"
              rx="260"
              ry="320"
              fill="#dc2626"
              opacity=".06"
              filter="url(#dblur)"
            />
          </svg>
        </div>

        {/* Card */}
        <div className="anim-card relative z-10 w-full max-w-md">
          <div className="glass border border-white/55 dark:border-white/[0.07] rounded-3xl p-8 shadow-[0_12px_56px_rgba(0,0,0,0.10)] dark:shadow-[0_12px_56px_rgba(0,0,0,0.72)]">
            {/* Header */}
            <div className="anim-logo mb-7 text-center">
              <div className="logo-float relative inline-flex items-center justify-center w-[60px] h-[60px] rounded-2xl mb-4 bg-gradient-to-br from-orange-400 to-rose-500 dark:from-red-600 dark:to-rose-800 shadow-lg shadow-orange-300/40 dark:shadow-red-900/70">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  viewBox="0 0 32 32"
                >
                  <path
                    clipRule="evenodd"
                    d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                    fill="currentColor"
                    fillRule="evenodd"
                  />
                </svg>
                <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-yellow-300 dark:bg-red-400 border-2 border-white dark:border-[#0a0a0a]" />
              </div>

              <p className="rivo-title text-[10px] font-bold tracking-[0.30em] uppercase text-orange-400 dark:text-red-400/80 mb-2">
                Rivo
              </p>

              {/* ← Playfair Display هنا بدل Syne */}
              <h1 className="anim-title rivo-heading text-[32px] font-bold tracking-tight leading-none text-gray-800 dark:text-white">
                Create{" "}
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500 dark:from-red-400 dark:to-rose-400">
                  Account
                </span>
              </h1>

              <p className="text-gray-400 dark:text-white/30 text-[12px] mt-2 font-light tracking-[0.20em] uppercase">
                Join Rivo today
              </p>
            </div>

            <div className="divider" />

            {/* API Error */}
            {apiError && (
              <div className="mb-5 flex items-center gap-2.5 bg-red-50 dark:bg-red-500/[0.07] border border-red-200/80 dark:border-red-500/20 text-red-500 dark:text-red-400 px-4 py-3 rounded-2xl">
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                  />
                </svg>
                <p className="text-[13px] font-medium">{apiError}</p>
              </div>
            )}

            {/* Form */}
            <form
              className="anim-form max-w-md mx-auto my-7"
              onSubmit={handleSubmit(handleRegister)}
            >
              <div className={`${fieldClass} anim-field field-glow`}>
                <label htmlFor="name" className={labelClass}>
                  Name
                </label>
                <input
                  {...register("name")}
                  type="text"
                  id="name"
                  className={inputClass}
                  placeholder="Name"
                />
                {formState.errors.name && formState.touchedFields.name && (
                  <p className={errorClass}>
                    <ErrorIcon />
                    {formState.errors.name?.message}
                  </p>
                )}
              </div>

              <div className={`${fieldClass} anim-field field-glow`}>
                <label htmlFor="email" className={labelClass}>
                  Email
                </label>
                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  className={inputClass}
                  placeholder="you@example.com"
                />
                {formState.errors.email && formState.touchedFields.email && (
                  <p className={errorClass}>
                    <ErrorIcon />
                    {formState.errors.email?.message}
                  </p>
                )}
              </div>

              <div className={`${fieldClass} anim-field field-glow`}>
                <label htmlFor="password" className={labelClass}>
                  Password
                </label>
                <input
                  {...register("password")}
                  type="password"
                  id="password"
                  className={inputClass}
                  placeholder="••••••••"
                />
                {formState.errors.password &&
                  formState.touchedFields.password && (
                    <p className={errorClass}>
                      <ErrorIcon />
                      {formState.errors.password?.message}
                    </p>
                  )}
              </div>

              <div className={`${fieldClass} anim-field field-glow`}>
                <label htmlFor="rePassword" className={labelClass}>
                  Confirm Password
                </label>
                <input
                  {...register("rePassword")}
                  type="password"
                  id="rePassword"
                  className={inputClass}
                  placeholder="••••••••"
                />
                {formState.errors.rePassword &&
                  formState.touchedFields.rePassword && (
                    <p className={errorClass}>
                      <ErrorIcon />
                      {formState.errors.rePassword?.message}
                    </p>
                  )}
              </div>

              <div className={`${fieldClass} anim-field field-glow`}>
                <label htmlFor="date" className={labelClass}>
                  Date of Birth
                </label>
                <input
                  {...register("dateOfBirth")}
                  type="date"
                  id="date"
                  className={`${inputClass} scheme-light`}
                  placeholder=" "
                />
                {formState.errors.dateOfBirth &&
                  formState.touchedFields.dateOfBirth && (
                    <p className={errorClass}>
                      <ErrorIcon />
                      {formState.errors.dateOfBirth?.message}
                    </p>
                  )}
              </div>

              <div className="anim-field flex gap-5 mb-6 px-1">
                <label className="radio-pill flex items-center gap-2.5 cursor-pointer select-none group">
                  <input
                    {...register("gender")}
                    id="male"
                    type="radio"
                    name="gender"
                    value="male"
                  />
                  <span className="text-sm font-medium text-gray-600 dark:text-white/50 group-hover:text-gray-800 dark:group-hover:text-white/70 transition-colors">
                    Male
                  </span>
                </label>
                <label className="radio-pill flex items-center gap-2.5 cursor-pointer select-none group">
                  <input
                    {...register("gender")}
                    id="female"
                    type="radio"
                    name="gender"
                    value="female"
                  />
                  <span className="text-sm font-medium text-gray-600 dark:text-white/50 group-hover:text-gray-800 dark:group-hover:text-white/70 transition-colors">
                    Female
                  </span>
                </label>
                {formState.errors.gender && formState.touchedFields.gender && (
                  <p className={errorClass}>
                    <ErrorIcon />
                    {formState.errors.gender?.message}
                  </p>
                )}
              </div>

              <button
                disabled={isLoading}
                type="submit"
                className="btn-shimmer anim-field w-full text-white font-semibold text-sm px-4 py-3 rounded-2xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] bg-gradient-to-r from-orange-500 via-orange-400 to-rose-500 dark:from-red-600 dark:via-red-700 dark:to-rose-700 shadow-lg shadow-orange-200/60 dark:shadow-red-900/60 focus:outline-none focus:ring-4 focus:ring-orange-300/40 dark:focus:ring-red-500/30 transition-all duration-200 tracking-wide"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Loading...
                  </span>
                ) : (
                  "Register"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

