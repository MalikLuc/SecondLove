'use client';

import RackBooking from '../../components/RackBooking';

export default function BookRackPage() {
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8">Book a Rack</h1>
                <RackBooking />
            </div>
        </div>
    );
}