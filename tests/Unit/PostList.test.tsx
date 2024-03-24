import PostList from '../../src/components/PostList'; 
import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'



interface Post {
  id: number;
  username: string;
  petProfilePhoto: string;
  petImage: string;
  likeCount: number;
  commentCount: number;
};

interface PostListProps {
  posts: Post[];
};

const p1: Post = {
    id: 1,
    username: 'tart',
    petProfilePhoto: 'pig.jpg',
    petImage: 'tart.png',
    likeCount: Math.floor(Math.random() * 10),
    commentCount: Math.floor(Math.random() * 10),
};
  
const p2: Post = {
    id: 1,
    username: 'tent',
    petProfilePhoto: 'pig.jpg',
    petImage: 'tart.png',
    likeCount: Math.floor(Math.random() * 10),
    commentCount: Math.floor(Math.random() * 10),
};
  
const p3: Post = {
    id: 1,
    username: 'lent',
    petProfilePhoto: 'lent.jpg',
    petImage: 'lent.png',
    likeCount: Math.floor(Math.random() * 10),
    commentCount: Math.floor(Math.random() * 10),
};

const coupleOfPost: PostListProps = {
    posts: [p1, p2, p3]
};


describe('Unit test for PostList', () => {
    test('testing ', () => {
        render(<PostList posts={coupleOfPost.posts} />);
        const username = screen.getByText(/tart/i);
        expect(username).toBeInTheDocument();
    });
});