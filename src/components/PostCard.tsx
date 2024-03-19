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
  const [commentCount, setCommentCount] = useState(post.commentCount);
  const [showComments, setShowComments] = useState(false);
  const [comments, setNewComment] = useState<string[]>([]);
  const [editingComment, setEditingComment] = useState("");

  // Check if essential fields are present in the post object
  if (!post.id || !post.username || !post.petProfilePhoto || !post.petImage || post.likeCount === undefined || post.commentCount === undefined) {
    throw new Error('Invalid post data: Essential fields are missing.');
  }

  const handleLikeClick = () => {
    isLiked ? setLikeCount(prevCount => prevCount - 1) : setLikeCount(prevCount => prevCount + 1);
    setIsLiked(!isLiked);
  };

  const handleCommentClick = () => {
    setShowComments(!showComments);
  };

  const handleCommentAddition = () => {
    setNewComment(prev => [...prev, editingComment]);
    setCommentCount(prevCount => prevCount + 1)
  };

  const writingComment = (event:any) => {
    setEditingComment(event.target.value);
  }

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
          data-testid="like-bttn"
          className={`mr-2 flex items-center rounded-md px-4 py-2 ${isLiked ? "bg-red-500 text-white" : "bg-gray-300 text-gray-900"}`}
          onClick={handleLikeClick}
        >
          <FaHeart data-testid="like-count" className="mr-1" /> {likeCount}
        </button>
        <button
          className="flex items-center rounded-md bg-gray-300 px-4 py-2"
          onClick={handleCommentClick}
          data-testid="cmnt-bttn"
        >
          <FaComment className="mr-1" /> {commentCount}
        </button>
      </div>
      {showComments && (
        <div className="mt-4 rounded-md bg-gray-100 p-4">
          {/* Add comment section here */}
          Comments:
            {comments.map(cmnt => <div data-testid={`cmnt-${comments.indexOf(cmnt) + 1}`}>User {comments.indexOf(cmnt) + 1}: {cmnt}</div>)}
            <textarea data-testid="cmnt-text-area" className="mt-2 p-2 w-full" placeholder="Add a comment..." onChange={writingComment}/>
            <button
              className="flex items-center px-4 py-2 bg-gray-300 rounded-md"
              onClick={handleCommentAddition}
              data-testid="cmnt-post-bttn"
            >
              Post comment
            </button>
        </div>
      )}
    </div>
  );
};

export default PostCard;
