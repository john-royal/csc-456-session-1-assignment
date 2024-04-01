import Navbar from '../../src/components/navbar';
import {expect, test, describe, afterEach, vi} from 'vitest';
import '@testing-library/jest-dom/vitest'; //include methods for testing DOM elements like toBeInTheDocument() or toHaveTextContent().
import {render, screen, cleanup} from '@testing-library/react';


const useAuthMock = vi.hoisted(() => { //hoist before the mock so that we can have access to change it later on!!!
    return {
        useAuth: vi.fn(() => ({user: null, signOut: () => Promise.resolve(true)}))
    };
});

vi.mock('../../src/lib/auth.ts', async () => {
    const originalModule = await vi.importActual<typeof import('../../src/lib/auth.ts')>('../../src/lib/auth.ts');
    return{
        ...originalModule,
        useAuth: useAuthMock.useAuth
    };
});

vi.mock("react-router-dom", async () => {
    const originalModule = await vi.importActual<typeof import('../../src/lib/auth.ts')>('../../src/lib/auth.ts');
    return {
        ...originalModule,
        Link: ({children}: {children: any}) => <a>{children}</a>
    };
});

describe('Unit test of Sign in page components', () => {
    afterEach(() => {
        cleanup;
        vi.restoreAllMocks();
    });

    test('loading the signup page', () => {
        render(<Navbar />);
        expect(true).toBe(true);
    });

    test("navbar shows all tabs without user sign in", () => {
        render(<Navbar />);
        const tabs = [
            /petsitters/i, 
            /message/i, 
            /profile/i,
            /contact us/i,
            /log in/i,
            /sign up/i
        ];
        for(let tab of tabs){expect(screen.getByText(tab)).toBeInTheDocument();};
    });

    test("navbar shows slightly different tabs with user sign in", () => {
        useAuthMock.useAuth.mockReturnValueOnce({user: {email: 'testing@gmail.com'} , signOut: () => Promise.resolve(true)})
        render(<Navbar />);
        const tabs = [
            /petsitters/i, 
            /message/i, 
            /profile/i,
            /contact us/i,
            /sign out/i
        ];
        for(let tab of tabs){expect(screen.getByText(tab)).toBeInTheDocument();}; //check each of the new tabs to assure ourselves that we are signed in
        expect(screen.getByText('testing@gmail.com')).toBeInTheDocument(); // at last actually check if we are signed in
    });
});