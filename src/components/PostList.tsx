//This component will contain a
//list of PostCard components and make them scrollable.
import React from "react";

import PostCard from "./PostCard";

interface Post {
  id: string;
  username: string;
  petProfilePhoto: string;
  petImage: string;
  likeCount: number;
  commentCount: number;
}

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div className="w-4/12 mt-5">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
