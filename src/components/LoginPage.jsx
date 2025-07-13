import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './LoginPage.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { loginAction, error, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Email dan password harus diisi!');
      return;
    }
    try {
      await loginAction(email, password);
      navigate('/publications');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Portal Publikasi</h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Masukkan email: admin@gmail.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Masukkan password: admin123"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
            <div className="mt-2 flex items-center">
              <input
                id="showPassword"
                type="checkbox"
                checked={showPassword}
                onChange={e => setShowPassword(e.target.checked)}
                className="h-4 w-4 text-sky-600 border-gray-300 rounded"
              />
              <label htmlFor="showPassword" className="ml-2 block text-sm text-gray-900 cursor-pointer">
                Lihat Password
              </label>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-sky-700 text-white rounded-md hover:bg-sky-800 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
