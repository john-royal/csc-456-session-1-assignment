import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../lib/auth";

export default function Layout() {
  const { user, signOut } = useAuth();

  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {user ? (
              <button onClick={signOut}>Sign Out</button>
            ) : (
              <>
                <li>
                  <Link to="/auth/create-account">Create Account</Link>
                </li>
                <li>
                  <Link to="/auth/sign-in">Sign In</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
