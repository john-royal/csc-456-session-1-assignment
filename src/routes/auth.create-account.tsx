import React, { useState } from "react";
import { useAuth } from "../lib/auth";

interface CreateAccountFormElement extends HTMLFormElement {
  username: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
}

export default function CreateAccountPage() {
  const { createAccount } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [username, setUsername] = useState("");

  const handleSubmit = async (
    event: React.FormEvent<CreateAccountFormElement>
  ) => {
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
    <div className="bg-beige-100 flex h-screen items-center justify-center">
      <div className="w-full max-w-md rounded bg-white p-8 shadow-md">
        <h1 className="mb-8 text-center text-2xl font-bold">Sign Up Here</h1>
        {error && <p className="text-red-500">{error.message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="input input-bordered w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="mt-8">
            <button className="btn btn-primary w-full" disabled={loading}>
              {loading ? "Creating Account..." : "I'm ready!"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
