import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/users/register', { firstName, lastName, email, password });
      navigate('/login');
    } catch (error) {
      toast.error('Registration failed');
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          placeholder="First Name"
        />
        <input
          type="text"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          placeholder="Last Name"
        />
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
        <button type="submit" className="auth-button">Register</button>
      </form>
      <button onClick={handleLogin} className="login-button">Login</button>
    </div>
  );
};

export default Register;
