'use client';

import { useState } from 'react';
import RackBooking from '../../components/RackBooking';
import Link from 'next/link';
import { User, Settings, Package, Calendar, FileText } from 'lucide-react';

export default function Dashboard() {
    const [user, setUser] = useState({
        name: 'John Doe',
        email: 'john@example.com'
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600">
            <nav className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <span className="text-2xl font-bold text-white">SecondLove</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <span className="text-white mr-4">Welcome, {user.name}</span>
                            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <h1 className="text-3xl font-bold text-white mb-6">Dashboard</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg overflow-hidden">
                            <div className="px-4 py-5 sm:p-6">
                                <div className="flex items-center">
                                    <User className="h-8 w-8 text-white mr-3" />
                                    <h2 className="text-lg font-medium text-white">User Information</h2>
                                </div>
                                <div className="mt-4 space-y-2 text-white">
                                    <p><strong>Name:</strong> {user.name}</p>
                                    <p><strong>Email:</strong> {user.email}</p>
                                    <Link href="/profile" className="mt-3 inline-flex items-center text-white hover:text-indigo-200">
                                        Edit Profile
                                        <Settings className="ml-1 h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg overflow-hidden">
                            <div className="px-4 py-5 sm:p-6">
                                <div className="flex items-center mb-4">
                                    <Package className="h-8 w-8 text-white mr-3" />
                                    <h2 className="text-lg font-medium text-white">Quick Actions</h2>
                                </div>
                                <ul className="space-y-3">
                                    <li>
                                        <Link href="/inventory" className="flex items-center text-white hover:text-indigo-200">
                                            <Package className="mr-2 h-5 w-5" />
                                            Manage Inventory
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/bookings" className="flex items-center text-white hover:text-indigo-200">
                                            <Calendar className="mr-2 h-5 w-5" />
                                            View My Bookings
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/reports" className="flex items-center text-white hover:text-indigo-200">
                                            <FileText className="mr-2 h-5 w-5" />
                                            Generate Reports
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-white mb-4">Book a Rack</h2>
                        <RackBooking />
                    </div>
                </div>
            </main>
        </div>
    );
}