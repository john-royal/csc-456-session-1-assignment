import Layout from '../../src/components/layout.tsx';
import SignInPage from '../../src/routes/auth.sign-in.tsx';
import {expect, test, describe, afterEach, vi} from 'vitest';
import '@testing-library/jest-dom/vitest'; //include methods for testing DOM elements like toBeInTheDocument() or toHaveTextContent().
import {render, screen, cleanup} from '@testing-library/react';
import { url } from 'inspector';


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
    const originalModule = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
    return {
        ...originalModule,
        Outlet: () => <SignInPage />,
        Link: ({children}: {children: any}) => <a>{children}</a>
    };
});

describe('testing layout renders correctly', () => {
    afterEach(cleanup);

    test('actually loads', () => {
        render(<Layout />);

        expect(screen.getByText(/sign in/i)).toBeInTheDocument();
    });
});