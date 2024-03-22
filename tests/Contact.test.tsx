import Contact from '../src/routes/Contact';
import '@testing-library/jest-dom';
import {render, screen, waitFor} from '@testing-library/react';
import {doc, onSnapshot } from 'firebase/firestore';
import { db } from '../src/lib/firebase';

// const fetchData = async () => {
//     const docRef = doc(db, "contactdata", 'ycQt4f4Txl6rvwHiH5Vk');
//     const docSnap = await getDoc(docRef);
//     if(docSnap.exists()){
//         console.log(`data ${docSnap.data()}`);
//         return `data ${docSnap.data()}`
//     }
//     else{
//         console.log('NO DATA FOUND')
//         return `NO DATA FOUND`
//     }
// }

// fetchData();

// https://jestjs.io/docs/mock-functions
//mock the updating of firestore
// also ref https://github.com/programmerjoban/csc-456-paw/blob/main/tests/integration/Contact.test.tsx

describe('Integration test using the Contact page',() => {
    test('testing...', async () => {
        expect(true).toBe(true);
        onSnapshot(doc(db, "contactdata", 'ycQt4f4Txl6rvwHiH5Vk'), (doc) => {
            console.log('Current data:', doc.data());
        })
    }, 20000);

    test('testing...', async () => {
        render(<Contact />)
        const msgBox = screen.getByTestId('msg-box')
        await waitFor(() =>{
            expect(msgBox).toBeInTheDocument();
        }, {timeout: 5000});

        //so we have to do expects:
        //the first will check if a message sent was rendered on the page
        //the second and las will check the firestore to see if the item was actually added.
    }, 20000);
});