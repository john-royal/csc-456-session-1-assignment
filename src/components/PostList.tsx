//This component will contain a
//list of PostCard components and make them scrollable.
import React from "react";

import type { Post } from "~/lib/schema";
import PostCard from "./PostCard";

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div className="mt-5 w-4/12">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
