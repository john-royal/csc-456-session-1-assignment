import { useState } from "react";
import { FaComment, FaHeart } from "react-icons/fa";

export interface Post {
  id: number;
  username: string;
  petProfilePhoto: string;
  petImage: string;
  likeCount: number;
  commentCount: number;
}

export default function PostCard({ post }: { post: Post }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [commentCount, setCommentCount] = useState(post.commentCount);
  const [showComments, setShowComments] = useState(false);
  const [comments, setNewComment] = useState<string[]>([]);
  const [editingComment, setEditingComment] = useState("");

  // Check if essential fields are present in the post object
  if (
    !post.id ||
    !post.username ||
    !post.petProfilePhoto ||
    !post.petImage ||
    post.likeCount === undefined ||
    post.commentCount === undefined
  ) {
    throw new Error("Invalid post data: Essential fields are missing.");
  }

  const handleLikeClick = () => {
    isLiked
      ? setLikeCount((prevCount) => prevCount - 1)
      : setLikeCount((prevCount) => prevCount + 1);
    setIsLiked(!isLiked);
  };

  const handleCommentClick = () => {
    setShowComments(!showComments);
  };

  const handleCommentAddition = () => {
    setNewComment((prev) => [...prev, editingComment]);
    setCommentCount((prevCount) => prevCount + 1);
  };

  const writingComment = (event: any) => {
    setEditingComment(event.target.value);
  };

  return (
    <div className="mb-4 rounded-md border border-gray-200 bg-white p-4">
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
          <FaComment className="mr-1" /> {commentCount}
        </button>
      </div>
      {showComments && (
        <div className="mt-4 rounded-md bg-gray-100 p-4">
          Comments:
          {comments.map((comment, index) => (
            <div key={index}>
              User {index}: {comment}
            </div>
          ))}
          <textarea
            className="mt-2 w-full p-2"
            placeholder="Add a comment..."
            onChange={writingComment}
          />
          <button
            className="flex items-center rounded-md bg-gray-300 px-4 py-2"
            onClick={handleCommentAddition}
          >
            Post comment
          </button>
        </div>
      )}
    </div>
  );
}
