import type { User } from "firebase/auth";
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
  useSearchParams,
} from "react-router-dom";

import { auth } from "./firebase";

await auth.setPersistence(browserLocalPersistence);

export const fetchUser = async () => {
  await auth.authStateReady();
  return auth.currentUser;
};

export const requireUser = async ({ request }: LoaderFunctionArgs) => {
  const user = await fetchUser();
  if (!user) {
    return redirect(`/auth/sign-in?next=${encodeURIComponent(request.url)}`);
  }
  return user;
};

export const useOptionalUser = () => {
  return useRouteLoaderData("root") as User | null;
};

export const useUser = () => {
  const maybeUser = useOptionalUser();
  if (!maybeUser) {
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead.",
    );
  }
  return maybeUser;
};

export const useAuth = () => {
  const user = useOptionalUser();
  const revalidator = useRevalidator();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
    revalidator.revalidate();
    const next = searchParams.get("next") ?? "/protected";
    navigate(next);
  };

  const createAccount = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
    revalidator.revalidate();
    const next = searchParams.get("next") ?? "/protected";
    navigate(next);
  };

  const signOut = async () => {
    await auth.signOut();
    revalidator.revalidate();
    navigate("/");
  };

  return {
    user,
    signIn,
    createAccount,
    signOut,
  };
};
