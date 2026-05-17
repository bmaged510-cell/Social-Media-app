import React, { useState } from "react";
import { FaCommentAlt } from "react-icons/fa";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FaImage } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function CommentCreation({ postId, querykey }) {
  const form = useForm({
    defaultValues: {
      body: "",
      image: "",
    },
  });

  const [imagePreview, setImagePreview] = useState(null);

  const query = useQueryClient();

  const { register, handleSubmit, reset } = form;

  function createComment(formData) {
    return axios.post(
      `https://route-posts.routemisr.com/posts/${postId}/comments`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("UserToken")}`,
        },
      }
    );
  }

  const { isPending, mutate } = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: querykey });
      reset();
      setImagePreview(null);
      toast.success("Comment created successfull👍");
    },
    onError: () => {
      toast.error("can't create comment ");
    },
  });

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  }

  function handleRemoveImage() {
    setImagePreview(null);
    reset({ image: "" });
  }

  function handlecreateComment(values) {
    if (!values.body && !values.image[0]) return;

    const formData = new FormData();

    if (values.body) {
      formData.append("content", values.body);
    }
    if (values.image[0]) {
      formData.append("image", values.image[0]);
    }

    mutate(formData);
  }

  return (
    <div className="w-[90%] mx-auto my-1">
      <form onSubmit={handleSubmit(handlecreateComment)}>

        {imagePreview && (
          <div className="relative mb-3 rounded-xl overflow-hidden border border-white/40 dark:border-white/[0.06] group">
            <img
              src={imagePreview}
              alt="preview"
              className="w-full max-h-48 object-cover"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-red-500/90 dark:bg-red-600 text-white rounded-full p-0.5 hover:bg-red-600 transition-colors"
            >
              <IoMdClose className="size-5" />
            </button>
          </div>
        )}

        <div className="flex items-center gap-2">

          <div className="flex-1 flex items-center
            bg-white/60 dark:bg-white/[0.06]
            border border-white/70 dark:border-white/[0.09]
            rounded-xl overflow-hidden
            backdrop-blur-sm
            focus-within:border-orange-400 dark:focus-within:border-red-500
            focus-within:ring-2 focus-within:ring-orange-200/50 dark:focus-within:ring-red-500/20
            transition-all duration-200
          ">
            <input
              {...register("body")}
              type="text"
              placeholder="Write a comment..."
              className="
                flex-1 px-4 py-2.5 text-sm
                bg-transparent outline-none
                text-gray-700 dark:text-white/80
                placeholder:text-gray-400 dark:placeholder:text-white/25
              "
            />

            <button
              type="submit"
              disabled={isPending}
              className="
                px-3 py-2.5 mr-1
                bg-gradient-to-r from-orange-500 to-rose-500 dark:from-red-600 dark:to-rose-700
                hover:from-orange-400 hover:to-rose-400 dark:hover:from-red-500 dark:hover:to-rose-600
                text-white rounded-lg
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200 active:scale-95
                shadow-sm shadow-orange-200/50 dark:shadow-red-900/30
              "
            >
              {isPending ? (
                <svg className="animate-spin h-3 w-3 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              ) : (
                <FaCommentAlt size={13} />
              )}
            </button>
          </div>

          <label htmlFor="test" className="cursor-pointer shrink-0">
            <div className={`
              w-10 h-10 flex items-center justify-center rounded-xl
              border backdrop-blur-sm transition-all duration-200
              ${imagePreview
                ? "bg-orange-50 dark:bg-red-500/15 border-orange-300 dark:border-red-500/40 text-orange-500 dark:text-red-400"
                : "bg-white/60 dark:bg-white/[0.06] border-white/70 dark:border-white/[0.09] text-gray-400 dark:text-white/30 hover:text-orange-500 dark:hover:text-red-400 hover:border-orange-300 dark:hover:border-red-500/40 hover:bg-white/80 dark:hover:bg-white/[0.09]"
              }
            `}>
              <FaImage size={15} />
            </div>
          </label>
          <input
            {...register("image")}
            id="test"
            type="file"
            hidden
            onChange={handleImageChange}
          />

        </div>
      </form>
    </div>
  );
}