import React, { useState } from 'react';
import { useAuth } from '../lib/auth';

interface SignUpFormElement extends HTMLFormElement {
  username: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
}

export default function SignUpPage() {
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = async (event: React.FormEvent<SignUpFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
  
    const form = event.currentTarget;
    if (!form.email || !form.password) {
      setError(new Error("Form fields are not correctly referenced"));
      setLoading(false);
      return;
    }
  
    const email = form.email.value;
    const password = form.password.value;
  
    try {
      await signUp(email, password);
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error("An unknown error occurred")
      );
    }
  
    setLoading(false);
  };

  const styles = {
      container: {
    maxWidth: '400px',
    padding: '20px',
    textAlign: 'center',
    background: '#f5f5dc', // Light beige
    borderRadius: '15px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    margin: '20vh auto 0', 
  },
    title: {
      marginBottom: '20px',
      fontFamily: '"Comic Sans MS", "Comic Sans", cursive', 
      color: '#334', 
      fontSize: '2em', 
      animation: 'movingBox 5s linear infinite',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
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
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" placeholder="Username" style={styles.input} />
        <input type="email" placeholder="Email" style={styles.input} />
        <input type="password" placeholder="Password" style={styles.input} />
        <button type="submit" style={styles.button} disabled={loading}>
          I'm ready!
        </button>
      </form>
      {error && <p style={styles.error}>{error.message}</p>}
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
