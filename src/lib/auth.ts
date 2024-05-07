import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  LoaderFunctionArgs,
  redirect,
  useNavigate,
  useRevalidator,
  useRouteLoaderData,
} from "react-router-dom";

import type { CreateAccountInput, SignInInput } from "./schema";
import { auth } from "./firebase";
import { users } from "./repositories";

//const DEFAULT_REDIRECT = "/"; // After you sign in, you'll be redirected to this page.
const SIGN_IN_PATH = "/auth/sign-in";

void auth.setPersistence(browserLocalPersistence);

/**
 * A hook that provides authentication methods and the currently authenticated user.
 */
export const useAuth = () => {
  const user = useOptionalUser();
  const revalidator = useRevalidator();
  const navigate = useNavigate();
  //const [searchParams] = useSearchParams();

  /**
   * Signs in with email and password, then loads the current user and redirects to the next page.
   * @param email
   * @param password
   */
  const signIn = async ({ email, password }: SignInInput) => {
    await signInWithEmailAndPassword(auth, email, password);
    revalidator.revalidate();
    //const next = searchParams.get("next") ?? DEFAULT_REDIRECT;
    navigate("/");
  };

  /**
   * Creates a new account with email and password, then loads the current user and redirects to the next page.
   * @param email
   * @param password
   */
  const createAccount = async (input: CreateAccountInput) => {
    await createUserWithEmailAndPassword(auth, input.email, input.password);

    // TODO: Use user.uid as the document ID instead of the email address.
    await users.set(input.email, {
      username: input.username,
      email: input.email,
    });

    revalidator.revalidate();
    //const next = searchParams.get("next") ?? DEFAULT_REDIRECT;
    navigate("/");
  };

  /**
   * Signs out, then loads the current user and redirects to the sign-in page.
   */
  const signOut = async () => {
    await auth.signOut();
    revalidator.revalidate();
    navigate(SIGN_IN_PATH);
  };

  return {
    user,
    signIn,
    createAccount,
    signOut,
  };
};

/**
 * A React hook that returns the currently authenticated user, or `null` if the user is not authenticated.
 */
export const useOptionalUser = () => {
  return useRouteLoaderData("root") as Awaited<ReturnType<typeof fetchUser>>;
};

/**
 * A React hook that returns the currently authenticated user, or throws an error if the user is not authenticated.
 */
export const useUser = () => {
  const maybeUser = useOptionalUser();
  if (!maybeUser) {
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead.",
    );
  }
  return maybeUser;
};

/**
 * A React Router loader function that loads the currently authenticated user.
 * This is used on the root route to populate the `useOptionalUser` and `useUser` hooks.
 * To re-run this loader (e.g. when the user signs in or out), use `revalidator.revalidate()` from `useRevalidator`.
 * Note: Routes and loaders are defined in `src/main.tsx`.
 *
 * @see {@link https://reactrouter.com/en/main/route/loader}
 */
export const fetchUser = async () => {
  await auth.authStateReady();
  const user = auth.currentUser;
  if (!user) {
    return null;
  }
  const profile = (await users.get(user.email!))!;
  return {
    ...user,
    ...profile,
  };
};

/**
 * A React Router loader function that redirects to the sign-in page if the user is not authenticated.
 * This is similar to `fetchUser`, but it can be used to require authentication on specific routes.
 */
export const requireUser = async ({ request }: LoaderFunctionArgs) => {
  const user = await fetchUser();
  if (!user) {
    return redirect(`${SIGN_IN_PATH}?next=${encodeURIComponent(request.url)}`);
  }
  return user;
};
