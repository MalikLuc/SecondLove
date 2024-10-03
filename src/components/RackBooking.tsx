import React, { useState } from 'react';
import { format, addDays, startOfWeek } from 'date-fns';
import WeeklyCalendar from './WeeklyCalendar';
import AvailableRacks from './AvailableRacks';

type BookingOption = 'do-it-yourself' | 'all-inclusive';
type BookingDuration = '7-days' | '14-days';

interface PricingOption {
    price: number;
    commission: number;
}

const pricingModel: Record<BookingOption, Record<BookingDuration, PricingOption>> = {
    'do-it-yourself': {
        '7-days': { price: 40, commission: 20 },
        '14-days': { price: 78, commission: 20 },
    },
    'all-inclusive': {
        '7-days': { price: 40, commission: 35 },
        '14-days': { price: 78, commission: 35 },
    },
};

export default function RackBooking() {
    const [option, setOption] = useState<BookingOption>('do-it-yourself');
    const [duration, setDuration] = useState<BookingDuration>('7-days');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [selectedRackId, setSelectedRackId] = useState<string | null>(null);

    const endDate = startDate ? addDays(startDate, duration === '7-days' ? 6 : 13) : null;

    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOption(e.target.value as BookingOption);
    };

    const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDuration(e.target.value as BookingDuration);
        if (startDate) {
            setStartDate(startOfWeek(startDate, { weekStartsOn: 1 }));
        }
    };

    const handleSelectWeek = (date: Date) => {
        setStartDate(startOfWeek(date, { weekStartsOn: 1 }));
        setSelectedRackId(null); // Reset selected rack when date changes
    };

    const handleSelectRack = (rackId: string) => {
        setSelectedRackId(rackId);
    };

    const { price, commission } = pricingModel[option][duration];

    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-4 rounded-lg">
                        <h3 className="text-xl font-semibold text-white mb-4">Select Start Week:</h3>
                        <WeeklyCalendar
                            selectedDate={startDate}
                            onSelectWeek={handleSelectWeek}
                            duration={duration}
                        />
                    </div>
                    <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-4 rounded-lg">
                        <AvailableRacks
                            startDate={startDate}
                            endDate={endDate}
                            onSelectRack={handleSelectRack}
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-3 text-white">Select Option:</h3>
                        <div className="space-y-2">
                            <label className="flex items-center space-x-3 text-white">
                                <input
                                    type="radio"
                                    className="form-radio text-indigo-600"
                                    name="option"
                                    value="do-it-yourself"
                                    checked={option === 'do-it-yourself'}
                                    onChange={handleOptionChange}
                                />
                                <span>Do it yourself</span>
                            </label>
                            <label className="flex items-center space-x-3 text-white">
                                <input
                                    type="radio"
                                    className="form-radio text-indigo-600"
                                    name="option"
                                    value="all-inclusive"
                                    checked={option === 'all-inclusive'}
                                    onChange={handleOptionChange}
                                />
                                <span>All inclusive</span>
                            </label>
                        </div>
                    </div>

                    <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-3 text-white">Select Duration:</h3>
                        <div className="space-y-2">
                            <label className="flex items-center space-x-3 text-white">
                                <input
                                    type="radio"
                                    className="form-radio text-indigo-600"
                                    name="duration"
                                    value="7-days"
                                    checked={duration === '7-days'}
                                    onChange={handleDurationChange}
                                />
                                <span>1 week</span>
                            </label>
                            <label className="flex items-center space-x-3 text-white">
                                <input
                                    type="radio"
                                    className="form-radio text-indigo-600"
                                    name="duration"
                                    value="14-days"
                                    checked={duration === '14-days'}
                                    onChange={handleDurationChange}
                                />
                                <span>2 weeks</span>
                            </label>
                        </div>
                    </div>

                    <div className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg p-6 rounded-lg">
                        <h3 className="text-xl font-semibold mb-4 text-white">Booking Summary:</h3>
                        <div className="space-y-2 text-white">
                            <p><strong>Option:</strong> {option === 'do-it-yourself' ? 'Do it yourself' : 'All inclusive'}</p>
                            <p><strong>Duration:</strong> {duration === '7-days' ? '1 week' : '2 weeks'}</p>
                            <p><strong>Start Date:</strong> {startDate ? format(startDate, 'dd.MM.yyyy') : 'Not selected'}</p>
                            <p><strong>End Date:</strong> {endDate ? format(endDate, 'dd.MM.yyyy') : 'Not selected'}</p>
                            <p><strong>Selected Rack:</strong> {selectedRackId || 'Not selected'}</p>
                            <p><strong>Price:</strong> €{price}</p>
                            <p><strong>Commission:</strong> {commission}%</p>
                        </div>
                        <button
                            className={`mt-6 w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md transition duration-150 ease-in-out transform hover:scale-105 ${
                                startDate && selectedRackId ? 'hover:bg-indigo-700' : 'opacity-50 cursor-not-allowed'
                            }`}
                            disabled={!startDate || !selectedRackId}
                        >
                            Confirm Booking
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}