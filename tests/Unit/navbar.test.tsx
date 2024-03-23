import Navbar from '../../src/components/navbar';
import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
// import userEvent from '@testing-library/user-event';
// import { useRouteLoaderData } from 'react-router';

describe('Unit test of navbar', () => {

    it('checking the component loads', async () => {
        render(<Navbar />)
        const contactTab = screen.getByText(/Contact Us/i);
        
        expect(contactTab).toBeInTheDocument();
        // userEvent.click(contactTab);
        // await waitFor(() => {
        //     const msgBox = screen.getByTestId('msg-box'); 
        //     expect(msgBox).toBeInTheDocument();
        // });
    });
});