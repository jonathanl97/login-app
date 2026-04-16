import { useState } from "react";
import { useNavigate } from "react-router";
//
import PropTypes from "prop-types";
import Button from "../components/Button";

async function signinUser(credentials) {
  const response = await fetch('http://localhost:8000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  });

  if (!response.ok) {
    throw new Error(`Login failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

export default function Login({ setToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const token = await signinUser({
        email,
        password
      });
      setToken(token);
    } catch (error) {
      setError(error.message || 'An error occured during sign in');
    } finally {
      setLoading(false);
    }
  }

  //Add "create account form" and split the view in half.
  return (
    <>
      <div>
        <h1>Sign in</h1>
        <form onSubmit={handleSubmit} >
          <label>
            <p>Email:</p>
            <input
              type="text"
              placeholder="Email"
              onChange={e => setEmail(e.target.value)}
              disabled={loading}
            />
          </label>

          <label>
            <p>Password:</p>
            <input
              type="password"
              placeholder="Password"
              onChange={e => setPassword(e.target.value)}
              disabled={loading}
            />
          </label>
          <div>
            <Button type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
            {/*
            <Button type="submit" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
            */}
          </div>
        </form>
      </div>
    </>
  )
}

//
Login.PropTypes = {
    setToken: PropTypes.func.isRequired
}