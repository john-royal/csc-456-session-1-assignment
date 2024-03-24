import { useState } from "react";

import { useAuth } from "../lib/auth";

export default function SignInPage() {
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    setError(null);

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
    <div className="bg-beige-100 flex h-screen items-center justify-center">
      <div className="w-full max-w-md rounded bg-white p-8 shadow-md">
        <h2 className="mb-8 text-center text-2xl font-bold">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              data-testid="email-input"
              placeholder="Email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              data-testid="pwd-input"
              placeholder="Password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mt-8">
            <button className="btn btn-primary w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </div>
          {error && <p className="text-red-500">{error.message}</p>}
        </form>
      </div>
    </div>
  );
}
