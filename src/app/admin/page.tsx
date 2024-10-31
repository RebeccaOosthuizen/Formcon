// pages/admin/login.tsx

"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import {auth} from "../config/firebase"
import router from 'next/router';


export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/admin/dashboard'); // Redirect if user is logged in
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin/dashboard'); 
    } catch (error) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Log In
          </button>
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
}
