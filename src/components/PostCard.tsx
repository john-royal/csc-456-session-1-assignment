import React, { useState } from 'react';
import { FaHeart, FaComment } from 'react-icons/fa';

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
  const [comments, setNewComment] = useState([]);
  const [editingComment, setEditingComment] = useState("");

  const handleLikeClick = () => {
    isLiked ? setLikeCount(prevCount => prevCount - 1) : setLikeCount(prevCount => prevCount + 1);
    setIsLiked(!isLiked);
  };

  const handleCommentClick = () => {
    setShowComments(!showComments);
  };

  const handleCommentAddition = () => {
    setNewComment(prev => [...prev, editingComment]);
  };

  const writingComment = (event) => {
    setEditingComment(event.target.value);
  }

  return (
    <div className="border border-gray-200 p-4 rounded-md mb-4">
      <div className="flex items-center mb-2">
        <img src={post.petProfilePhoto} alt="Pet Profile" className="w-12 h-12 rounded-full mr-2" />
        <span>{post.username}</span>
      </div>
      <img src={post.petImage} alt="Pet" className="w-full h-full object-cover rounded-md mb-2" />
      <div className="flex justify-between items-center">
        <button
          className={`flex items-center px-4 py-2 rounded-md mr-2 ${isLiked ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-900'}`}
          onClick={handleLikeClick}
        >
          <FaHeart className="mr-1" /> {likeCount}
        </button>
        <button
          className="flex items-center px-4 py-2 bg-gray-300 rounded-md"
          onClick={handleCommentClick}
        >
          <FaComment className="mr-1" /> {post.commentCount}
        </button>
      </div>
      {showComments && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          {/* Add comment section here */}
          Comments:
            {comments.map(cmnt => <div>User {comments.indexOf(cmnt) + 1}: {cmnt}</div>)}
            <textarea className="mt-2 p-2 w-full" placeholder="Add a comment..." onChange={writingComment}/>
            <button
              className="flex items-center px-4 py-2 bg-gray-300 rounded-md"
              onClick={handleCommentAddition}
            >
              Post comment
            </button>
        </div>
      )}
    </div>
  );
};

export default PostCard;
