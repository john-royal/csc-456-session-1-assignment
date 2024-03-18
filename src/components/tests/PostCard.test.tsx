import PostCard from "../PostCard.tsx";
import renderer from "react-test-renderer";
import '@testing-library/jest-dom'
import {fireEvent, render, waitFor} from '@testing-library/react'

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


it('check if test matches snapshot', () => { //test 1
    //make sure that there are no cached snapshots in the __snapshots__ dir
    const component = renderer.create(<PostCard post={sendCard.post}/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

it('check if like value is rendered', () => { //test 2
    const { getByText } = render(<PostCard post={sendCard.post}/>)
    const likeCountElem = getByText(String(aPost.likeCount))
    expect(likeCountElem).toBeInTheDocument()
});

it('check if like value is incremented', async () => { //test 3
    const { getByTestId, getByText } = render(<PostCard post={sendCard.post}/>)
    const likeCountBttn = getByTestId('like-bttn')

    fireEvent.click(likeCountBttn) //update the value
    const likeCount = getByText(String(aPost.likeCount + 1)) // likeCount value should be updated by now

    await waitFor(() => {
        expect(likeCount).toBeInTheDocument()
    })
});

it('check if like value is decremented', async () => { //test 4
    const { getByTestId, getByText } = render(<PostCard post={sendCard.post}/>)
    const likeCountBttn = getByTestId('like-bttn')

    fireEvent.click(likeCountBttn) //add a like
    fireEvent.click(likeCountBttn) //take back the like
    const likeCount = getByText(aPost.likeCount) // likeCount value should be updated by now

    await waitFor(() => {
        expect(likeCount).toBeInTheDocument()
    })
});

