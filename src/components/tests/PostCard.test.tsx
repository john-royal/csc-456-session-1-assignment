import PostCard from "../PostCard.tsx";
import renderer from "react-test-renderer";
import '@testing-library/jest-dom'
import {fireEvent ,render, waitFor, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

//types
interface Post {
    id: number;
    username: string;
    petProfilePhoto: string;
    petImage: string;
    likeCount: number;
    commentCount: number;
}
  
interface PostCardProps {
    post: Post;
}
  
const aPost: Post = {
    id: 123,
    username: "Borat",
    petProfilePhoto: "cat.jpg",
    petImage: "pfp.png",
    likeCount: 100,
    commentCount: 14,
}

const sendCard: PostCardProps = {
    post: aPost
}


describe('Unit Tests for PostCard component', () => {
    test('check if test matches snapshot', () => {
        //make sure that there are no cached snapshots in the __snapshots__ dir
        const component = renderer.create(<PostCard post={sendCard.post}/>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    
    test('check if like value is rendered', () => {
        const { getByText } = render(<PostCard post={sendCard.post}/>);
        const likeCountElem = getByText(String(aPost.likeCount));
        expect(likeCountElem).toBeInTheDocument();
    });
    
    test('check if like value is incremented', async () => {
        const { getByTestId, getByText } = render(<PostCard post={sendCard.post}/>);
        const likeCountBttn = getByTestId('like-bttn');
    
        fireEvent.click(likeCountBttn); //update the value
        const likeCount = getByText(String(aPost.likeCount + 1)); // likeCount value should be updated by now
    
        await waitFor(() => {
            expect(likeCount).toBeInTheDocument();
        }, {timeout: 5000});
    });
    
    test('check if like value is decremented', async () => {
        const { getByTestId, getByText } = render(<PostCard post={sendCard.post}/>);
        const likeCountBttn = getByTestId('like-bttn');
    
        fireEvent.click(likeCountBttn); //add a like
        fireEvent.click(likeCountBttn); //take back the like
        const likeCount = getByText(aPost.likeCount); // likeCount value should be updated by now
    
        await waitFor(() => {
            expect(likeCount).toBeInTheDocument();
        }, {timeout: 3000});
    });
    
    test('comment section renders', async () => {
        const { getByTestId } = render(<PostCard post={sendCard.post}/>);
        const createCommentbutton = getByTestId('cmnt-bttn');
    
        fireEvent.click(createCommentbutton);//open comment section...
        const postButton = getByTestId('cmnt-post-bttn'); // likeCount value should be updated by now...
    
        await waitFor(() => {
            expect(postButton).toBeInTheDocument();
        }, {timeout: 3000});
    });
    
    test('check error is thrown when recieving incomplete post.', async () => { //FIXME, this console.error's the thrown error 
        const err = () => render(<PostCard post={({} as any)}/>)
        expect(err).toThrow('Invalid post data: Essential fields are missing.');
    });  

    //cover comment issues
    test('typing into textbox', async () => {//verify that comments are being created
        render(<PostCard post={sendCard.post}/>);
        const createCommentbutton = screen.getByTestId('cmnt-bttn');
        fireEvent.click(createCommentbutton);//open comment section...

        const txtArea = screen.getByTestId('cmnt-text-area');//get the txtArea
        const someTxt = 'Hello World I have been written as a test :D'

        userEvent.type(txtArea, someTxt);
        await waitFor(() => {
            expect(txtArea).toHaveValue(someTxt);
        }, {timeout: 3000});
    });

    test('adding a comment', async () => {
        render(<PostCard post={sendCard.post}/>);
        const createCommentButton = screen.getByTestId('cmnt-bttn');
        fireEvent.click(createCommentButton);//open comment section...

        const txtArea = screen.getByTestId('cmnt-text-area');//get the txtArea
        const someTxt = 'Hello World I have been written as a test :D';
        const someTxtRgx = /Hello World I have been written as a test :D/i;
        await userEvent.type(txtArea, someTxt);//write in the txtArea

        const postCommentButton = screen.getByTestId('cmnt-post-bttn');
        await userEvent.click(postCommentButton);//post comment

        await waitFor(() => {
            const addedText = screen.getByText(someTxtRgx);//regex to identify the text.
            expect(addedText).toBeInTheDocument();
        }, {timeout: 3000});
    });
});


