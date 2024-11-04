import React, { createContext, useState } from 'react';

// AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // test credentials
  const testCredentials = {
    username: 'admin',
    password: '1234',
  };

  const login = async () => {
    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    // Mock authentication check
    if (email === testCredentials.username && password === testCredentials.password) {
      console.log('Login successful');
      alert('Login successful!');
      // You can proceed with navigation or storing a token here
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <AuthContext.Provider value={{ email, setEmail, password, setPassword, login }}>
      {children}
    </AuthContext.Provider>
  );
};
