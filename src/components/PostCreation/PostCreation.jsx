
import {
  Avatar,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import React, { useContext, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoImage } from "react-icons/io5";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";

export default function PostCreation() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { userLogin, userId } = useContext(AuthContext);

  const [isUploaded, setisUploaded] = useState(false);

  const query = useQueryClient();

  const textInput = useRef(null);
  const imageInput = useRef(null);

  function prepareData() {
    const formData = new FormData();
    if (textInput.current.value) {
      formData.append("body", textInput.current.value);
    }
    if (imageInput.current.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }
    return formData;
  }

  function createPost() {
    return axios.post(
      `https://route-posts.routemisr.com/posts`,
      prepareData(),
      {
        headers: {
          token: userLogin,
        },
      }
    );
  }

  const { isPending, mutate } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      setisUploaded(null);
      query.invalidateQueries({ queryKey: ["getAllPosts"] });
      toast.success("Post Created Successfully 👍", { closeOnClick: true, autoClose: 2000 });
    },
    onError: () => {
      toast.error("Can't Create Post Right Now ❌...!", { closeOnClick: true, autoClose: 2000 });
    },
  });

  function handleImagePreview(e) {
    const path = URL.createObjectURL(e.target.files[0]);
    setisUploaded(path);
  }

  function handleRemoveImage() {
    setisUploaded(false);
    imageInput.current.value = "";
  }

  return (
    <>
      <div className="max-w-2xl mx-auto mb-6 mt-5
        bg-white/20 dark:bg-white/[0.03]
        backdrop-blur-md
        border border-white/40 dark:border-white/[0.06]
        rounded-2xl p-4
      ">
        <div className="flex gap-3 items-center">
          <div className="p-[2px] rounded-full bg-gradient-to-tr from-orange-500 via-rose-400 to-orange-300 dark:from-red-500 dark:via-rose-500 dark:to-red-400 shrink-0">
            <div className="rounded-full border-2 border-white dark:border-[#0c0c0c] overflow-hidden">
              <Avatar
                size="md"
                src={userId?.photo}
                name={userId?.name}
                className="rounded-full"
              />
            </div>
          </div>
          <input
            onClick={onOpen}
            type="text"
            className="
              w-full px-4 py-2.5 text-sm rounded-xl
              bg-black/[0.03] dark:bg-white/[0.04]
              border border-black/[0.05] dark:border-white/[0.06]
              text-gray-400 dark:text-white/25
              placeholder:text-gray-400 dark:placeholder:text-white/20
              cursor-pointer outline-none
              hover:border-orange-300 dark:hover:border-red-500/30
              transition-all duration-200
            "
            placeholder="What's in your mind....!"
            readOnly
          />
        </div>
      </div>

      <div className="modal">
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          classNames={{
            base: "bg-white/40 dark:bg-black/60 backdrop-blur-2xl border border-white/60 dark:border-white/[0.08] shadow-[0_8px_48px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_48px_rgba(0,0,0,0.70)] rounded-2xl",
            header: "border-b border-white/40 dark:border-white/[0.06]",
            footer: "border-t border-white/40 dark:border-white/[0.06]",
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <span className="text-[15px] font-black tracking-tight text-gray-800 dark:text-white/90">
                    Create Your{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500 dark:from-red-400 dark:to-rose-400">
                      Post
                    </span>
                  </span>
                </ModalHeader>

                <ModalBody>
                  <textarea
                    ref={textInput}
                    className="
                      w-full p-3 text-sm rounded-xl min-h-[100px] resize-none
                      bg-white/60 dark:bg-white/[0.06]
                      border border-white/70 dark:border-white/[0.09]
                      text-gray-700 dark:text-white/80
                      placeholder:text-gray-400 dark:placeholder:text-white/25
                      outline-none
                      focus:border-orange-400 dark:focus:border-red-500
                      focus:ring-2 focus:ring-orange-200/50 dark:focus:ring-red-500/20
                      backdrop-blur-sm transition-all duration-200
                    "
                    placeholder="What's on your mind?"
                  />

                  {isUploaded && (
                    <div className="relative rounded-xl overflow-hidden border border-white/40 dark:border-white/[0.06]">
                      <img
                        alt="Card background"
                        className="object-cover rounded-xl w-full"
                        src={isUploaded}
                      />
                      <button
                        onClick={handleRemoveImage}
                        className="absolute top-2.5 end-2.5 bg-red-500/90 dark:bg-red-600 text-white cursor-pointer rounded-full p-0.5 hover:bg-red-600 transition-colors"
                      >
                        <IoMdClose className="size-5" />
                      </button>
                    </div>
                  )}
                </ModalBody>

                <ModalFooter className="flex items-center">
                  <label className="cursor-pointer text-gray-400 dark:text-white/30 hover:text-orange-500 dark:hover:text-red-400 transition-colors duration-200 mr-auto">
                    <IoImage className="size-6" />
                    <input
                      ref={imageInput}
                      type="file"
                      hidden
                      onChange={handleImagePreview}
                    />
                  </label>

                  <Button
                    color="danger"
                    variant="light"
                    onPress={onClose}
                    className="text-gray-500 dark:text-white/40 hover:text-rose-500 dark:hover:text-red-400"
                  >
                    Close
                  </Button>

                  <Button
                    color="primary"
                    isLoading={isPending}
                    isDisabled={isPending}
                    onPress={() => {
                      mutate();
                      onClose();
                    }}
                    className="bg-gradient-to-r from-orange-500 to-rose-500 dark:from-red-600 dark:to-rose-700 text-white font-semibold shadow-lg shadow-orange-200/50 dark:shadow-red-900/40 border-0"
                  >
                    {isPending ? "Creating..." : "Create"}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );

}