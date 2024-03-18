import type { Post } from "./post-card";
import PostCard from "./post-card";

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <div className="mt-5 w-4/12">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
