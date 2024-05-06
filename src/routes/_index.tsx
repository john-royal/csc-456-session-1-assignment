// HomePage.tsx
import React from "react";

import type { Post } from "~/lib/schema";
import PostItem from "~/components/post-item";

const HomePage: React.FC = () => {
  const posts: Post[] = [
    {
      id: "1",
      user: {
        id: "1",
        username: "petlover123",
        imageUrl: "/images/catProf.png",
      },
      imageUrl: "/images/cat.png",
    },
    {
      id: "2",
      user: {
        id: "2",
        username: "furryfriends456",
        imageUrl: "/images/dogProf.png",
      },
      imageUrl: "/images/dog.png",
    },
    {
      id: "3",
      user: {
        id: "1",
        username: "petlover123",
        imageUrl: "/images/catProf.png",
      },
      imageUrl: "/images/cat.png",
    },
    {
      id: "4",
      user: {
        id: "2",
        username: "furryfriends456",
        imageUrl: "/images/dogProf.png",
      },
      imageUrl: "/images/dog.png",
    },
  ];

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
