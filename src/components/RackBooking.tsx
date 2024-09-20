import React, { useState } from 'react';
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday, addMonths } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

// Mock function to check if a date is available
const isDateAvailable = (date: Date) => {
    // In a real application, this would check against your backend
    return date.getTime() > new Date().getTime() && date.getDay() !== 0 && date.getDay() !== 6;
};

export default function RackBooking() {
    const [option, setOption] = useState<BookingOption>('do-it-yourself');
    const [duration, setDuration] = useState<BookingDuration>('7-days');
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

    const endDate = addDays(startDate, duration === '7-days' ? 7 : 14);

    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOption(e.target.value as BookingOption);
    };

    const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDuration(e.target.value as BookingDuration);
    };

    const handleDateClick = (date: Date) => {
        if (isDateAvailable(date)) {
            setStartDate(date);
        }
    };

    const { price, commission } = pricingModel[option][duration];

    const renderCalendar = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = monthStart;
        const endDate = monthEnd;

        const dateFormat = "d";
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;
                days.push(
                    <div
                        className={`py-2 px-3 cursor-pointer ${
                            !isSameMonth(day, monthStart)
                                ? "text-gray-400"
                                : isDateAvailable(day)
                                    ? "hover:bg-indigo-200 hover:bg-opacity-50"
                                    : "text-gray-400 cursor-not-allowed"
                        } ${isSameDay(day, startDate) ? "bg-indigo-600 text-white" : ""} ${
                            isToday(day) ? "border border-indigo-600" : ""
                        }`}
                        key={day.toString()}
                        onClick={() => handleDateClick(cloneDay)}
                    >
                        <span className="text-sm">{formattedDate}</span>
                        {isDateAvailable(day) && isSameMonth(day, monthStart) && (
                            <div className="w-1 h-1 bg-green-400 rounded-full mx-auto mt-1"></div>
                        )}
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div className="grid grid-cols-7" key={day.toString()}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="bg-white bg-opacity-10 rounded-lg p-4">{rows}</div>;
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                <span>7 days</span>
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
                                <span>14 days</span>
                            </label>
                        </div>
                    </div>

                    <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white">Select Start Date:</h3>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
                                    className="p-2 rounded-full hover:bg-indigo-200 hover:bg-opacity-50"
                                >
                                    <ChevronLeft className="w-5 h-5 text-white" />
                                </button>
                                <button
                                    onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                                    className="p-2 rounded-full hover:bg-indigo-200 hover:bg-opacity-50"
                                >
                                    <ChevronRight className="w-5 h-5 text-white" />
                                </button>
                            </div>
                        </div>
                        <div className="text-center text-white mb-2">
                            {format(currentMonth, 'MMMM yyyy')}
                        </div>
                        <div className="grid grid-cols-7 mb-2">
                            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                                <div key={day} className="text-center text-white text-sm font-semibold">
                                    {day}
                                </div>
                            ))}
                        </div>
                        {renderCalendar()}
                    </div>
                </div>

                <div className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 text-white">Booking Summary:</h3>
                    <div className="space-y-2 text-white">
                        <p><strong>Option:</strong> {option === 'do-it-yourself' ? 'Do it yourself' : 'All inclusive'}</p>
                        <p><strong>Duration:</strong> {duration === '7-days' ? '7 days' : '14 days'}</p>
                        <p><strong>Start Date:</strong> {format(startDate, 'dd.MM.yyyy')}</p>
                        <p><strong>End Date:</strong> {format(endDate, 'dd.MM.yyyy')}</p>
                        <p><strong>Price:</strong> €{price}</p>
                        <p><strong>Commission:</strong> {commission}%</p>
                    </div>
                    <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition duration-150 ease-in-out transform hover:scale-105">
                        Confirm Booking
                    </button>
                </div>
            </div>
        </div>
    );
}