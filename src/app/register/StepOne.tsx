'use client';

import { useState } from 'react';

interface StepOneProps {
    onSubmit: (email: string, password: string) => void;
}

export default function StepOne({ onSubmit }: StepOneProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validatePassword = (value: string) => {
        if (value.length < 8) {
            setPasswordError('Password must be at least 8 characters long');
        } else {
            setPasswordError('');
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        validatePassword(newPassword);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password.length >= 8) {
            onSubmit(email, password);
        } else {
            setPasswordError('Password must be at least 8 characters long');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-2 bg-white bg-opacity-20 rounded border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-50 focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                    placeholder="your@email.com"
                />
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    className="w-full p-2 bg-white bg-opacity-20 rounded border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-50 focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                    placeholder="••••••••"
                />
                {passwordError && (
                    <p className="mt-2 text-red-400 text-sm">{passwordError}</p>
                )}
            </div>
            <button
                type="submit"
                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={password.length < 8}
            >
                Next
            </button>
        </form>
    );
}