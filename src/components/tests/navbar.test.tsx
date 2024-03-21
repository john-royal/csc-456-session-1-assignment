import Navbar from '../navbar'
import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'

describe('Integration test of navbar and authentication', () => {
    test('testing render', () => {
        render(<Navbar />) ;
        expect(screen.getByRole('button')).toBeInTheDocument();
    });
});