import React from "react";

import LoadingScreen from "~/components/loading";
import PostItem from "~/components/post/post-item";
import { usePosts } from "~/data/post";

const HomePage: React.FC = () => {
  const { data } = usePosts();

  if (!data) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex items-center justify-center ">
      <div className="mt-5 w-4/12">
        {data.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
