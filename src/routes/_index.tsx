// HomePage.tsx
import React from "react";

import PostCard from "~/components/PostCard";

const HomePage: React.FC = () => {
  const posts = [
    {
      id: "1",
      username: "petlover123",
      petProfilePhoto: "/images/catProf.png",
      petImage: "/images/cat.png",
      likeCount: 0,
      commentCount: 0,
    },
    {
      id: "2",
      username: "furryfriends456",
      petProfilePhoto: "/images/dogProf.png",
      petImage: "/images/dog.png",
      likeCount: 0,
      commentCount: 0,
    },
    {
      id: "2",
      username: "furryfriends456",
      petProfilePhoto: "/images/dogProf.png",
      petImage: "/images/dog.png",
      likeCount: 0,
      commentCount: 0,
    },
    {
      id: "2",
      username: "furryfriends456",
      petProfilePhoto: "/images/dogProf.png",
      petImage: "/images/dog.png",
      likeCount: 0,
      commentCount: 0,
    },
    {
      id: "2",
      username: "furryfriends456",
      petProfilePhoto: "/images/dogProf.png",
      petImage: "/images/dog.png",
      likeCount: 0,
      commentCount: 0,
    },
    {
      id: "2",
      username: "furryfriends456",
      petProfilePhoto: "/images/dogProf.png",
      petImage: "/images/dog.png",
      likeCount: 0,
      commentCount: 0,
    },
    {
      id: "2",
      username: "furryfriends456",
      petProfilePhoto: "/images/dogProf.png",
      petImage: "/images/dog.png",
      likeCount: 0,
      commentCount: 0,
    },
    // Add more posts as needed
  ];

  return (
    <div className="flex items-center justify-center ">
      <div className="mt-5 w-4/12">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
