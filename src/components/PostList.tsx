//This component will contain a 
//list of PostCard components and make them scrollable.
import React from 'react';
import PostCard from './PostCard';

interface Post {
    id: number;
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
    <div className="w-5/12">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
