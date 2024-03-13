import { useAuth } from "../lib/auth";
import { useState } from "react";

export default function CreateAccountPage() {
  const { createAccount } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    setError(null);

    const form = event.currentTarget;
    const email = form.email.value;
    const password = form.password.value;
    try {
      await createAccount(email, password);
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error("An unknown error occurred")
      );
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Create Account</h1>
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
          {loading ? "Creating Account…" : "Create Account"}
        </button>
      </form>
    </div>
  );
}
