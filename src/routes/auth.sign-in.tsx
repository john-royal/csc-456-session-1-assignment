import { useState } from "react";

import { useAuth } from "../lib/auth";

interface SignInFormElement extends HTMLFormElement {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

export default function SignInPage() {
  const { signIn } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = async (event: React.FormEvent<SignInFormElement>) => {
    event.preventDefault();

    setLoading(true);
    setError(null);

    const form = event.currentTarget;
    const email = form.email.value;
    const password = form.password.value;
    try {
      await signIn(email, password);
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error("An unknown error occurred"),
      );
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Sign In</h1>
      {error ? <p>{error.message}</p> : null}
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input type="email" name="email" />
        </label>
        <label>
          Password
          <input type="password" name="password" />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Signing In…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
