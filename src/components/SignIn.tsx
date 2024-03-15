import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase'; 

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Signed in successfully!');
      // Redirect to another page or update the UI accordingly
    } catch (error) {
      console.error(error);
      // Optionally handle error state in UI
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-beige-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded">
        <h2 className="text-2xl font-bold mb-8 text-center">Sign In</h2>
        <form onSubmit={handleSignIn}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-8">
            <button type="submit" className="btn btn-primary w-full">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;

