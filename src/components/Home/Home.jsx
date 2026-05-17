
import React from "react";
import axios from "axios";
import PostCard from "./../PostCard/PostCard";
import Loader from "./../Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import PostCreation from './../PostCreation/PostCreation';
import { Helmet } from 'react-helmet';

export default function Home() {

  function getAllPosts() {
    return axios.get(`https://route-posts.routemisr.com/posts`, {
      params: { sort: "-createdAt" },
      headers: { Authorization: `Bearer ${localStorage.getItem("UserToken")}` },
    });
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getAllPosts"],
    queryFn: getAllPosts,
  });

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0 block dark:hidden"><LightBg /></div>
        <div className="absolute inset-0 z-0 hidden dark:block"><DarkBg /></div>
        <div className="relative z-10 text-center p-8 rounded-2xl bg-white/30 dark:bg-white/[0.04] backdrop-blur-xl border border-white/60 dark:border-white/[0.08]">
          <p className="text-rose-500 text-lg font-semibold">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Home page</title>
      </Helmet>

      <div className="relative min-h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0 block dark:hidden"><LightBg /></div>
        <div className="absolute inset-0 z-0 hidden dark:block"><DarkBg /></div>

        <div className="relative z-10 max-w-2xl mx-auto px-4 py-8">

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-[2px] bg-orange-500" />
              <span className="text-[10px] text-orange-500 font-bold tracking-[0.3em] uppercase">
                Social Feed
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90 tracking-tight">
              Feed
            </h1>
            <p className="text-sm text-gray-400 dark:text-white/25 mt-1 font-light">
              What's happening around you
            </p>
          </div>

          <div className="mb-6">
            <PostCreation />
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gray-300/50 dark:bg-white/[0.08]" />
            <span className="text-[11px] text-gray-400 dark:text-white/20 font-medium tracking-widest uppercase">
              Latest Posts
            </span>
            <div className="h-px flex-1 bg-gray-300/50 dark:bg-white/[0.08]" />
          </div>

          {data?.data?.data?.posts?.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-3xl mb-4">✦</p>
              <p className="text-gray-400 dark:text-white/30 text-[15px] font-medium">No posts yet</p>
              <p className="text-gray-300 dark:text-white/15 text-[13px] mt-1">Be the first to share something!</p>
            </div>
          ) : (
            <div className="space-y-1">
              {data?.data?.data?.posts?.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
}

function LightBg() {
  return (
    <svg viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="lBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fafafa" />
          <stop offset="100%" stopColor="#f3f4f6" />
        </linearGradient>
        <filter id="lBlob"><feGaussianBlur stdDeviation="60" /></filter>
      </defs>
      <rect width="1440" height="900" fill="url(#lBg)" />
      <ellipse cx="1300" cy="100" rx="400" ry="300" fill="#f97316" opacity="0.06" filter="url(#lBlob)" />
      <ellipse cx="200"  cy="800" rx="350" ry="250" fill="#fb923c" opacity="0.05" filter="url(#lBlob)" />
      <ellipse cx="700"  cy="400" rx="300" ry="200" fill="#fed7aa" opacity="0.07" filter="url(#lBlob)" />
      <line x1="0" y1="0" x2="1440" y2="900" stroke="#f97316" strokeWidth="1" opacity="0.06" />
    </svg>
  );
}

function DarkBg() {
  return (
    <svg viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="dBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0c0c0c" />
          <stop offset="100%" stopColor="#111111" />
        </linearGradient>
        <filter id="dBlob"><feGaussianBlur stdDeviation="70" /></filter>
      </defs>
      <rect width="1440" height="900" fill="url(#dBg)" />
      <ellipse cx="1300" cy="100" rx="420" ry="300" fill="#f97316" opacity="0.07" filter="url(#dBlob)" />
      <ellipse cx="150"  cy="800" rx="360" ry="260" fill="#ea580c" opacity="0.05" filter="url(#dBlob)" />
      <ellipse cx="700"  cy="450" rx="280" ry="200" fill="#f97316" opacity="0.03" filter="url(#dBlob)" />
      <line x1="0" y1="0" x2="1440" y2="900" stroke="#f97316" strokeWidth="1" opacity="0.04" />
    </svg>
  );
}