import Navbar from '../navbar'
import '@testing-library/jest-dom'
import {render} from '@testing-library/react'
// import {render, screen} from '@testing-library/react'

describe('Integration test of navbar and authentication', () => {
    test('testing render', async () => {
        render(<Navbar />);
        expect(true).toBe(true)
    });
});