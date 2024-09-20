'use client';

import {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';

interface StepTwoProps {
    onSubmit: (fullName: string, address: string, telephone: string) => void;
}

const countryCodes = ['+49', '+44'];

export default function StepTwo({ onSubmit }: StepTwoProps) {
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [countryCode, setCountryCode] = useState('+49');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const router = useRouter();

    const validatePhoneNumber = (code: string, number: string) => {
        const phoneRegex = code === '+49' ? /^[1-9]\d{7,11}$/ : /^[1-9]\d{9}$/;
        if (!phoneRegex.test(number)) {
            setPhoneError(`Please enter a valid ${code === '+49' ? 'German' : 'UK'} phone number`);
        } else {
            setPhoneError('');
        }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newNumber = e.target.value.replace(/\D/g, '');
        setPhoneNumber(newNumber);
        validatePhoneNumber(countryCode, newNumber);
    };

    const handleCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCountryCode(e.target.value);
        validatePhoneNumber(e.target.value, phoneNumber);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!phoneError && phoneNumber) {
            onSubmit(fullName, address, `${countryCode}${phoneNumber}`);
            // Redirect to dashboard after successful registration
            router.push('/dashboard');
        }
    };

    useEffect(() => {
        validatePhoneNumber(countryCode, phoneNumber);
    }, [countryCode, phoneNumber]);

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-white">Full Name</label>
                <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full p-2 bg-white bg-opacity-20 rounded border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-50 focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                    placeholder="John Doe"
                />
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <label htmlFor="address" className="block mb-2 text-sm font-medium text-white">Address</label>
                <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="w-full p-2 bg-white bg-opacity-20 rounded border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-50 focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                    placeholder="123 Main St, City, Country"
                />
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <label htmlFor="telephone" className="block mb-2 text-sm font-medium text-white">Telephone</label>
                <div className="flex">
                    <select
                        value={countryCode}
                        onChange={handleCountryCodeChange}
                        className="p-2 bg-white bg-opacity-20 rounded-l border-r-0 border border-white border-opacity-30 text-white focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                    >
                        {countryCodes.map((code) => (
                            <option key={code} value={code}>
                                {code}
                            </option>
                        ))}
                    </select>
                    <input
                        type="tel"
                        id="telephone"
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        required
                        className="flex-1 p-2 bg-white bg-opacity-20 rounded-r border-l-0 border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-50 focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                        placeholder={countryCode === '+49' ? '1512345678' : '7911123456'}
                    />
                </div>
                {phoneError && (
                    <p className="mt-2 text-red-400 text-sm">{phoneError}</p>
                )}
                <p className="mt-2 text-sm text-white opacity-70">
                    {countryCode === '+49' ? 'Format: 8-12 digits' : 'Format: 10 digits'}
                </p>
            </div>
            <button
                type="submit"
                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!!phoneError || !phoneNumber}
            >
                Register
            </button>
        </form>
    );
}