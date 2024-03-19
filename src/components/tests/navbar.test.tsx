import Navbar from '../navbar'
import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'

test('testing render', () => {
    render(<Navbar />) 
    expect(screen.getByRole('button')).toBeInTheDocument();
})