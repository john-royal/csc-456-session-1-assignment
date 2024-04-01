import Contact from '../../src/routes/Contact';
import '../../src/lib/firebase';
import {expect, test, describe, vi, afterEach} from 'vitest'
import '@testing-library/jest-dom/vitest';
import {render, waitFor, screen, cleanup} from '@testing-library/react'
import userEvent from '@testing-library/user-event'


// https://jestjs.io/docs/mock-functions
// mock the updating of firestore
// also ref https://github.com/programmerjoban/csc-456-paw/blob/main/tests/integration/Contact.test.tsx

vi.mock('firebase/firestore', async () => {
    const originalModule = await vi.importActual<typeof import('firebase/firestore')>('firebase/firestore');
    return{
        ...originalModule,
        addDoc: vi.fn(() => Promise.resolve(true))// mock a succesful promise resolution
    };
});


describe('Integration test for the Contact page',() => {
    afterEach(() => {
        cleanup;
        vi.restoreAllMocks();
    });

    test('should have loaded the message box', async () => {
        render(<Contact />);
        const msgBox = screen.getByTestId('msg-box');
        await waitFor(() =>{
            expect(msgBox).toBeInTheDocument();
        });
    }, 5000);

    test('successful form submission', async () => {
        render(<Contact />);
        //getting the elements from the document
        const nameBox = screen.getByTestId('name-box');
        const emailBox = screen.getByTestId('email-box');
        const msgBox = screen.getByTestId('msg-box');
        const submitBttn = screen.getByTestId('submit-bttn');

        await userEvent.type(nameBox, 'Brandon');//write in the txtArea
        await userEvent.type(emailBox, 'testing@gmail.com');
        await userEvent.type(msgBox, 'test written with jest');
        await userEvent.click(submitBttn);//send the message...

        await waitFor(() => {
            const messageSent = screen.getByText(/Message Sent!/i);
            expect(messageSent).toBeInTheDocument();
        }, {timeout: 3000});


    }, 5000);

    test('unsuccessful form submission', async () => {
        render(<Contact />);
        //getting the elements from the document
        const nameBox = screen.getByTestId('name-box');
        const emailBox = screen.getByTestId('email-box');
        const msgBox = screen.getByTestId('msg-box');
        const submitBttn = screen.getByTestId('submit-bttn');

        await userEvent.type(nameBox, '    ');//write in the txtArea
        await userEvent.type(emailBox, '    ');
        await userEvent.type(msgBox, '    ');
        await userEvent.click(submitBttn);//send the message...

        await waitFor(() => {
            const messageSent = screen.queryByText(/Message Sent!/i); // use query so we can check if it returns null after not finding (it shouldn't find it)
            expect(messageSent).toBe(null);
        }, {timeout: 3000});
    }, 5000);
});