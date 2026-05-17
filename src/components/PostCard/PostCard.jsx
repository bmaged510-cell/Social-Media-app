
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import CommentCreation from "./../CommentCreation/CommentCreation";
import { LuLoaderCircle } from "react-icons/lu";
import { HiDotsVertical } from "react-icons/hi";
import { MdEdit, MdOutlineDelete } from "react-icons/md";
import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";
import { toast } from "react-toastify";

const PlaceHolder_IMAGE =
  "https://avatars.githubusercontent.com/u/86160567?s=200&v=4";

export default function PostCard({ post, isPostDetails = false }) {
  const { body, image, topComment, createdAt, user, _id, commentsCount } = post;
  const { name, photo } = user;
  const { userId: logedUserId } = useContext(AuthContext);
  const userId = user._id;

  const navigate = useNavigate();
  const query = useQueryClient();

  function getPostComments() {
    return axios.get(`https://route-posts.routemisr.com/posts/${_id}/comments`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("UserToken")}` },
    });
  }

  const { data, isLoading } = useQuery({
    queryKey: ["getPostComments", _id],
    queryFn: getPostComments,
    enabled: isPostDetails,
  });

  const allComments = data?.data?.data?.comments;

  function deleteMyPost() {
    return axios.delete(`https://route-posts.routemisr.com/posts/${_id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("UserToken")}` },
    });
  }

  const { isPending, mutate } = useMutation({
    mutationFn: deleteMyPost,
    onSuccess: () => {
      toast.success("Post Deleted Successfully");
      query.invalidateQueries({ queryKey: ["getAllPosts"] });
      navigate("/");
    },
    onError: () => {
      toast.error("can't delete post right now");
    },
  });

  if (!body && !image) return null;

  return (
    <div className="max-w-2xl mx-auto mb-4 overflow-hidden rounded-2xl bg-white/20 dark:bg-white/[0.03] backdrop-blur-md border border-white/40 dark:border-white/[0.06] transition-all duration-300">

      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="p-[2px] rounded-full bg-gradient-to-tr from-orange-500 via-rose-400 to-orange-300 dark:from-red-500 dark:via-rose-500 dark:to-red-400 shrink-0">
            <img
              src={photo || PlaceHolder_IMAGE}
              alt={name}
              onError={(e) => { e.target.src = PlaceHolder_IMAGE; }}
              className="w-10 h-10 rounded-full border-2 border-white dark:border-[#0c0c0c] object-cover"
            />
          </div>
          <div>
            <p className="text-[14px] font-semibold text-gray-800 dark:text-white/80 leading-none mb-1">{name}</p>
            <p className="text-[11px] text-gray-400 dark:text-white/20">{createdAt?.slice(0, 10)}</p>
          </div>
        </div>

        {logedUserId === userId && (
          <Dropdown>
            <DropdownTrigger>
              <button className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 dark:text-white/25 hover:text-orange-500 dark:hover:text-red-400 hover:bg-orange-50 dark:hover:bg-white/[0.05] transition-all duration-200">
                <HiDotsVertical size={15} />
              </button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Post Actions"
              className="bg-white/80 dark:bg-black/60 backdrop-blur-xl border border-white/60 dark:border-white/[0.08] rounded-xl shadow-xl"
            >
              <DropdownItem key="edit" className="text-gray-600 dark:text-white/70 rounded-lg">
                <div className="flex items-center justify-between gap-4 py-0.5">
                  <span className="text-sm">Edit</span>
                  <MdEdit size={15} />
                </div>
              </DropdownItem>
              <DropdownItem key="delete" className="text-rose-500 dark:text-red-400 rounded-lg">
                <div className="flex items-center justify-between gap-4 py-0.5" onClick={() => !isPending && mutate()}>
                  <span className="text-sm">{isPending ? "Deleting..." : "Delete"}</span>
                  <MdOutlineDelete size={15} className={isPending ? "animate-spin" : ""} />
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </div>

      <div className="h-px bg-black/[0.04] dark:bg-white/[0.05]" />

      <div className="px-5 py-4">
        {body && (
          <p className="text-[14px] text-gray-600 dark:text-white/60 leading-relaxed mb-3">{body}</p>
        )}
        {image && (
          <div className="rounded-xl overflow-hidden border border-black/[0.04] dark:border-white/[0.05]">
            <img src={image} alt={body} className="w-full object-cover" />
          </div>
        )}
      </div>

      <div className="h-px bg-black/[0.04] dark:bg-white/[0.05]" />

      <div className="px-3 py-2 flex items-center justify-between">
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] text-gray-400 dark:text-white/30 hover:text-orange-500 dark:hover:text-red-400 hover:bg-orange-50 dark:hover:bg-white/[0.04] transition-all duration-200">
          <span>👍</span>
          <span>Like</span>
        </button>

        <Link
          to={`/postdetails/${_id}`}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] text-gray-400 dark:text-white/30 hover:text-orange-500 dark:hover:text-red-400 hover:bg-orange-50 dark:hover:bg-white/[0.04] transition-all duration-200"
        >
          <span>💬</span>
          <span>
            Comments{commentsCount > 0 && (
              <span className="ml-1 bg-orange-100 dark:bg-red-500/15 text-orange-500 dark:text-red-400 text-[11px] font-bold px-1.5 py-0.5 rounded-full">
                {commentsCount}
              </span>
            )}
          </span>
        </Link>

        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] text-gray-400 dark:text-white/30 hover:text-orange-500 dark:hover:text-red-400 hover:bg-orange-50 dark:hover:bg-white/[0.04] transition-all duration-200">
          <span>↗️</span>
          <span>Share</span>
        </button>
      </div>

      {!isPostDetails && topComment && (
        <>
          <div className="h-px bg-black/[0.04] dark:bg-white/[0.05]" />
          <div className="mx-4 my-3 p-3 bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.04] rounded-xl flex gap-3">
            <img
              src={topComment.commentCreator?.photo || PlaceHolder_IMAGE}
              alt={topComment.commentCreator?.name}
              className="w-7 h-7 rounded-full object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-semibold text-gray-700 dark:text-white/60 mb-0.5">{topComment.commentCreator?.name}</p>
              <p className="text-[12px] text-gray-500 dark:text-white/40 truncate">{topComment.content}</p>
            </div>
          </div>
        </>
      )}

      {isPostDetails && (
        <>
          <div className="h-px bg-black/[0.04] dark:bg-white/[0.05]" />
          <div className="px-5 py-4">
            <CommentCreation postId={_id} querykey={["getPostComments", _id]} />
          </div>

          <div className="h-px bg-black/[0.04] dark:bg-white/[0.05]" />

          <div className="px-5 py-4">
            <h3 className="text-[14px] font-semibold text-gray-700 dark:text-white/70 mb-4">
              Comments
              <span className="ml-2 text-[11px] font-bold text-orange-500 dark:text-red-400 bg-orange-50 dark:bg-red-500/10 px-2 py-0.5 rounded-full">
                {commentsCount || 0}
              </span>
            </h3>

            {isLoading ? (
              <div className="flex justify-center py-8">
                <LuLoaderCircle className="animate-spin text-2xl text-orange-500 dark:text-red-400" />
              </div>
            ) : allComments && allComments.length > 0 ? (
              <div className="space-y-2">
                {allComments.map((comment) => (
                  <div
                    key={comment._id}
                    className="flex gap-3 p-3 bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.04] dark:border-white/[0.04] rounded-xl"
                  >
                    <img
                      src={comment.commentCreator?.photo || PlaceHolder_IMAGE}
                      alt={comment.commentCreator?.name}
                      className="w-8 h-8 rounded-full object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-gray-700 dark:text-white/70 mb-1">{comment.commentCreator?.name}</p>
                      <p className="text-[13px] text-gray-500 dark:text-white/45 leading-relaxed">{comment.content}</p>
                      <p className="text-[11px] text-gray-300 dark:text-white/20 mt-1.5">{new Date(comment.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400 dark:text-white/25 text-[14px]">No comments yet</p>
                <p className="text-gray-300 dark:text-white/15 text-[12px] mt-1">Be the first to comment!</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}