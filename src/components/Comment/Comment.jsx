import React from 'react';

const PlaceHolder_IMAGE =
  "https://avatars.githubusercontent.com/u/86160567?s=200&v=4";

export default function Comment({ comment }) {
  return (
    <div className="flex gap-3 p-3.5 bg-white/40 dark:bg-white/[0.03] border border-white/60 dark:border-white/[0.05] rounded-xl mb-3 backdrop-blur-sm hover:bg-white/60 dark:hover:bg-white/[0.05] transition-colors duration-200">
      <div className="p-[2px] rounded-full bg-gradient-to-tr from-orange-500 via-rose-400 to-orange-300 dark:from-red-500 dark:via-rose-500 dark:to-red-400 shrink-0">
        <img
          src={comment.commentCreator?.photo || PlaceHolder_IMAGE}
          alt={comment.commentCreator?.name}
          className="w-9 h-9 rounded-full border-2 border-white dark:border-[#0a0a0a] object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-gray-700 dark:text-white/75 leading-none mb-1">
          {comment.commentCreator?.name}
        </p>
        <p className="text-[11px] text-gray-300 dark:text-white/20 mb-2">
          {new Date(comment.createdAt).toLocaleDateString()}
        </p>

        {comment.content && (
          <p className="text-[13px] text-gray-500 dark:text-white/50 leading-relaxed mb-2">
            {comment.content}
          </p>
        )}

        {comment.image && (
          <div className="mt-2 rounded-xl overflow-hidden border border-white/40 dark:border-white/[0.06] group">
            <img
              src={comment.image}
              alt="comment"
              className="max-w-md w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        )}
      </div>
    </div>
  );
}