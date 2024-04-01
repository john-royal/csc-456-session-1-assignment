import LoadingScreen from '../../src/components/loading';
import {expect, test, describe, afterEach} from 'vitest';
import '@testing-library/jest-dom/vitest'; //include methods for testing DOM elements like toBeInTheDocument() or toHaveTextContent().
import {render, screen, cleanup} from '@testing-library/react'


describe('Unit test of Sign in page components', () => {
    afterEach(cleanup);
    test('loading the signup page', () => {
        render(<LoadingScreen />);

        const spinner = screen.getByTestId('spinner');
        const spinnerClass = screen.getByTestId('spinner-look')

        expect(spinner).toBeInTheDocument();
        expect(spinnerClass).toBeInTheDocument();
    })
})