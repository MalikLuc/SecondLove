'use client';

import { useState } from 'react';
import RackBooking from '../../components/RackBooking';
import Link from 'next/link';
import { User, Settings, Package, Calendar, FileText } from 'lucide-react';

export default function Dashboard() {
    const [user] = useState({
        name: 'John Doe',
        email: 'john@example.com'
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <span className="text-2xl font-bold text-green-600">SecondLove</span>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <span className="text-gray-700 mr-4">Welcome, {user.name}</span>
                            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="px-4 py-5 sm:p-6">
                                <div className="flex items-center">
                                    <User className="h-8 w-8 text-green-500 mr-3" />
                                    <h2 className="text-lg font-medium text-gray-900">User Information</h2>
                                </div>
                                <div className="mt-4 space-y-2 text-gray-700">
                                    <p><strong>Name:</strong> {user.name}</p>
                                    <p><strong>Email:</strong> {user.email}</p>
                                    <Link href="/profile" className="mt-3 inline-flex items-center text-green-600 hover:text-green-700">
                                        Edit Profile
                                        <Settings className="ml-1 h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="px-4 py-5 sm:p-6">
                                <div className="flex items-center mb-4">
                                    <Package className="h-8 w-8 text-green-500 mr-3" />
                                    <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
                                </div>
                                <ul className="space-y-3">
                                    <li>
                                        <Link href="/inventory" className="flex items-center text-green-600 hover:text-green-700">
                                            <Package className="mr-2 h-5 w-5" />
                                            Manage Inventory
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/bookings" className="flex items-center text-green-600 hover:text-green-700">
                                            <Calendar className="mr-2 h-5 w-5" />
                                            View My Bookings
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/reports" className="flex items-center text-green-600 hover:text-green-700">
                                            <FileText className="mr-2 h-5 w-5" />
                                            Generate Reports
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Kleiderstange mieten</h2>
                        <RackBooking />
                    </div>
                </div>
            </main>
        </div>
    );
}