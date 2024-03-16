import React, { useState } from "react";
import { FaComment, FaHeart } from "react-icons/fa";

interface Post {
  id: number;
  username: string;
  petProfilePhoto: string;
  petImage: string;
  likeCount: number;
  commentCount: number;
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [showComments, setShowComments] = useState(false);

  const handleLikeClick = () => {
    if (isLiked) {
      setLikeCount((prevCount) => prevCount - 1);
    } else {
      setLikeCount((prevCount) => prevCount + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleCommentClick = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="mb-4 rounded-md border border-gray-200 p-4 bg-white">
      <div className="mb-2 flex items-center">
        <img
          src={post.petProfilePhoto}
          alt="Pet Profile"
          className="mr-2 h-12 w-12 rounded-full"
        />
        <span>{post.username}</span>
      </div>
      <img
        src={post.petImage}
        alt="Pet"
        className="mb-2 h-full w-full rounded-md object-cover"
      />
      <div className="flex items-center justify-between">
        <button
          className={`mr-2 flex items-center rounded-md px-4 py-2 ${isLiked ? "bg-red-500 text-white" : "bg-gray-300 text-gray-900"}`}
          onClick={handleLikeClick}
        >
          <FaHeart className="mr-1" /> {likeCount}
        </button>
        <button
          className="flex items-center rounded-md bg-gray-300 px-4 py-2"
          onClick={handleCommentClick}
        >
          <FaComment className="mr-1" /> {post.commentCount}
        </button>
      </div>
      {showComments && (
        <div className="mt-4 rounded-md bg-gray-100 p-4">
          {/* Add comment section here */}
          Comments:
          <div>Comment 1</div>
          <div>Comment 2</div>
          <div>Comment 3</div>
          <textarea
            className="mt-2 w-full p-2"
            placeholder="Add a comment..."
          />
        </div>
      )}
    </div>
  );
};

export default PostCard;
