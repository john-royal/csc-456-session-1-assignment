import React from "react";
import { useLoaderData } from "react-router";

import type { Post } from "~/lib/schema";
import PostItem from "~/components/post/post-item";
import { posts } from "~/lib/repositories";

const loadPosts = async () => {
  return await posts.list();
};

const HomePage: React.FC = () => {
  const posts = useLoaderData() as Post[];

  return (
    <div className="flex items-center justify-center ">
      <div className="mt-5 w-4/12">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
export { loadPosts };
