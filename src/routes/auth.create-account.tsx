import React, { useState } from 'react';
import { useAuth } from '../lib/auth';

interface CreateAccountFormElement extends HTMLFormElement {
  username: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
}

export default function CreateAccountPage() {
  const { createAccount } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = async (
    event: React.FormEvent<CreateAccountFormElement>,
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
        error instanceof Error ? error : new Error("An unknown error occurred"),
      );
    }

    setLoading(false);
  };

  const styles = {
    container: {
    maxWidth: '400px',
    padding: '20px',
    background: '#f5f5dc', // Light beige
    borderRadius: '15px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    margin: '20vh auto 0', 
    justifyContent: 'center',
    },
    title: {
      marginBottom: '20px',
      fontFamily: '"Comic Sans MS", "Comic Sans", cursive', 
      color: '#334', 
      fontSize: '2em', 
      animation: 'movingBox 5s linear infinite',
    },
    form: {
    },
    input: {
      marginBottom: '10px',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
    button: {
      padding: '10px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    error: {
      color: 'red',
      marginTop: '10px',
    },
  };


  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Sign Up Here</h1>
      {error && <p style={styles.error}>{error.message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" style={styles.input} />
        <input type="email" name="email" placeholder="Email" style={styles.input} />
        <input type="password" name="password" placeholder="Password" style={styles.input} />
        <button type="submit" style={styles.button} disabled={loading}>
        {loading ? "Creating Account…" : "I'm ready!"}
        </button>
      </form>
    </div>
  );
}


const keyframes = `
  @keyframes movingBox {
    0% { box-shadow: 0 0 10px #FFF; }
    50% { box-shadow: 0 0 20px #FFF; transform: translateX(10px); }
    100% { box-shadow: 0 0 10px #FFF; transform: translateX(-10px); }
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = keyframes;
document.head.appendChild(styleSheet);
