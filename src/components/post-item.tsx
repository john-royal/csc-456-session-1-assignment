import React, { useState } from "react";
import { ChatBubbleLeftIcon, HeartIcon } from "@heroicons/react/20/solid";

import type { Post } from "~/lib/schema";
import PostComments from "./post-comments";

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showComments, setShowComments] = useState(false);

  const handleLikeClick = () => {
    isLiked
      ? setLikeCount((prevCount) => prevCount - 1)
      : setLikeCount((prevCount) => prevCount + 1);
    setIsLiked(!isLiked);
  };

  const handleCommentClick = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="mb-4 rounded-md border border-gray-200 bg-white p-4">
      <div className="mb-2 flex items-center">
        <img
          src={post.user.imageUrl ?? undefined}
          alt="Pet Profile"
          className="mr-2 h-12 w-12 rounded-full"
        />
        <span>{post.user.username}</span>
      </div>
      <img
        src={post.imageUrl}
        alt="Pet"
        className="mb-2 h-full w-full rounded-md object-cover"
      />
      <div className="flex items-center justify-between">
        <button
          className={`mr-2 flex items-center rounded-md px-4 py-2 ${isLiked ? "bg-red-500 text-white" : "bg-gray-300 text-gray-900"}`}
          onClick={handleLikeClick}
        >
          <HeartIcon className="mr-1 size-5" /> {likeCount}
        </button>
        <button
          className="flex items-center rounded-md bg-gray-300 px-4 py-2"
          onClick={handleCommentClick}
        >
          <ChatBubbleLeftIcon className="size-5" />
        </button>
      </div>
      {showComments && <PostComments postId={post.id} />}
    </div>
  );
};

export default PostItem;
