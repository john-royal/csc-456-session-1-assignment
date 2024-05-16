import Navbar from '~/components/navbar';
import { expect, test, describe, afterEach, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, cleanup } from '@testing-library/react';


const useAuthMock = vi.hoisted(() => { //hoist before the mock so that we can have access to change it later on!!!
    return {
        useAuth: vi.fn(() => ({user: {email: null, username: "iLoveTesting"}, signOut: () => Promise.resolve(true)}))
    };
});

vi.mock('../../../src/lib/auth.ts', async () => {
    const originalModule = await vi.importActual<typeof import('../../../src/lib/auth.ts')>('../../../src/lib/auth.ts');
    return{
        ...originalModule,
        useAuth: useAuthMock.useAuth
    };
});

vi.mock('react-router-dom', () => ({
    ...vi.importActual('react-router-dom'),
    Link: ({ children }) => <a>{children}</a> 
}));

describe('Navbar component tests', () => {
    afterEach(() => {
        cleanup();
        vi.restoreAllMocks();
    });
    test("navbar behaves as if user is signed in", () => {
        render(<Navbar />);
        expect(screen.queryByText(/log in/i)).not.toBeInTheDocument();
        expect(screen.getByText(/signed in as/i)).toBeInTheDocument();
    });

    test('renders all of the tabs for navbar correctly', () => {
        render(<Navbar />);
        const tabs = [
            /paw/i,
            /petsitters/i, 
            /message/i, 
            /profile/i,
            /contact us/i,
            /account/i,
            /signed in as/i,
            /sign out/i
        ];
        tabs.forEach(tab => expect(screen.getByText(tab)).toBeInTheDocument());
    });
    test('renders logged in user correctly', () => {
        useAuthMock.useAuth.mockReturnValueOnce({user: {email: "testing@gmail.com", username: "iLoveTesting"}, signOut: () => Promise.resolve(true)});
        render(<Navbar />);
        expect(screen.getByText('testing@gmail.com')).toBeInTheDocument();
    });
    test('renders logged in user correctly', () => {
        useAuthMock.useAuth.mockReturnValueOnce({user: {email: "anotherEmail@gmail.com", username: "iLoveTesting"}, signOut: () => Promise.resolve(true)});
        render(<Navbar />);
        expect(screen.queryByText('testing@gmail.com')).not.toBeInTheDocument();
    });
});

