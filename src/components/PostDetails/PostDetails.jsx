
import React from 'react';
import { useParams } from 'react-router-dom';
import Loader from './../Loader/Loader';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import PostCard from './../PostCard/PostCard';

export default function PostDetails() {
  const { id } = useParams();

  function getPostDetails() {
    return axios.get(`https://route-posts.routemisr.com/posts/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("UserToken")}` }
    });
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getSinglePost", id],
    queryFn: getPostDetails,
  });

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0 block dark:hidden"><LightBg id="pdE" /></div>
        <div className="absolute inset-0 z-0 hidden dark:block"><DarkBg id="pdE" /></div>
        <div className="relative z-10 max-w-2xl mx-auto p-4">
          <div className="bg-white/30 dark:bg-white/[0.04] backdrop-blur-xl border border-white/60 dark:border-white/[0.08] rounded-2xl p-6 shadow-[0_8px_48px_rgba(0,0,0,0.10)] dark:shadow-[0_8px_48px_rgba(0,0,0,0.70)]">
            <h1 className="text-rose-500 dark:text-red-400 text-xl font-bold">Error: {error.message}</h1>
            <p className="text-sm text-gray-500 dark:text-white/35 mt-2">Failed to load post details. Please try again.</p>
          </div>
        </div>
      </div>
    );
  }

  const post = data?.data?.data?.post;

  if (!post) {
    return (
      <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0 block dark:hidden"><LightBg id="pdN" /></div>
        <div className="absolute inset-0 z-0 hidden dark:block"><DarkBg id="pdN" /></div>
        <div className="relative z-10 max-w-2xl mx-auto p-4">
          <div className="bg-white/30 dark:bg-white/[0.04] backdrop-blur-xl border border-white/60 dark:border-white/[0.08] rounded-2xl p-6 text-center shadow-[0_8px_48px_rgba(0,0,0,0.10)] dark:shadow-[0_8px_48px_rgba(0,0,0,0.70)]">
            <p className="text-gray-500 dark:text-white/35 text-lg">Post not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0 block dark:hidden"><LightBg id="pd" /></div>
      <div className="absolute inset-0 z-0 hidden dark:block"><DarkBg id="pd" /></div>
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8">
        <PostCard post={post} isPostDetails={true} />
      </div>
    </div>
  );
}

function LightBg({ id }) {
  return (
    <svg viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`${id}lBase`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fafafa" />
          <stop offset="100%" stopColor="#f3f4f6" />
        </linearGradient>
        <filter id={`${id}lBlob`}><feGaussianBlur stdDeviation="60" /></filter>
      </defs>
      <rect width="1440" height="900" fill={`url(#${id}lBase)`} />
      <ellipse cx="1300" cy="100" rx="400" ry="300" fill="#f97316" opacity="0.06" filter={`url(#${id}lBlob)`} />
      <ellipse cx="200"  cy="800" rx="350" ry="250" fill="#fb923c" opacity="0.05" filter={`url(#${id}lBlob)`} />
      <ellipse cx="700"  cy="400" rx="300" ry="200" fill="#fed7aa" opacity="0.07" filter={`url(#${id}lBlob)`} />
      <line x1="0" y1="0" x2="1440" y2="900" stroke="#f97316" strokeWidth="1" opacity="0.06" />
    </svg>
  );
}

function DarkBg({ id }) {
  return (
    <svg viewBox="0 0 1440 900" xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`${id}dBase`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0c0c0c" />
          <stop offset="100%" stopColor="#111111" />
        </linearGradient>
        <filter id={`${id}dBlob`}><feGaussianBlur stdDeviation="70" /></filter>
      </defs>
      <rect width="1440" height="900" fill={`url(#${id}dBase)`} />
      <ellipse cx="1300" cy="100" rx="420" ry="300" fill="#f97316" opacity="0.07" filter={`url(#${id}dBlob)`} />
      <ellipse cx="150"  cy="800" rx="360" ry="260" fill="#ea580c" opacity="0.05" filter={`url(#${id}dBlob)`} />
      <ellipse cx="700"  cy="450" rx="280" ry="200" fill="#f97316" opacity="0.03" filter={`url(#${id}dBlob)`} />
      <line x1="0" y1="0" x2="1440" y2="900" stroke="#f97316" strokeWidth="1" opacity="0.04" />
    </svg>
  );
}