// HomePage.tsx
import React from "react";

import PostList from "~/components/PostList";

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
      <PostList posts={posts} />
    </div>
  );
};

export default HomePage;
