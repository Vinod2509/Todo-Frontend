import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      toast.error('Login failed');
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="auth-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit" className="auth-button">Login</button>
      </form>
      <button onClick={handleRegister} className="register-button">Register</button>
    </div>
  );
};

export default Login;
