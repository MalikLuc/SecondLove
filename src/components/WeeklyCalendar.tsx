import React from 'react';
import { format, addWeeks, isSameWeek, isAfter, startOfWeek, addDays, isBefore, isSameMonth } from 'date-fns';

interface WeeklyCalendarProps {
    selectedDate: Date | null;
    onSelectWeek: (date: Date) => void;
    duration: '7-days' | '14-days';
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({ selectedDate, onSelectWeek, duration }) => {
    const today = new Date();
    const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 1 });

    const isWeekSelectable = (weekStart: Date) => {
        return isAfter(weekStart, today) || isSameWeek(weekStart, today, { weekStartsOn: 1 });
    };

    const isWeekSelected = (weekStart: Date) => {
        if (!selectedDate) return false;
        const selectedWeekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
        const selectedWeekEnd = addDays(selectedWeekStart, duration === '14-days' ? 13 : 6);
        return isSameWeek(weekStart, selectedWeekStart, { weekStartsOn: 1 }) ||
            (duration === '14-days' && isSameWeek(weekStart, addWeeks(selectedWeekStart, 1), { weekStartsOn: 1 }));
    };

    const renderWeek = (weekStart: Date, index: number) => {
        const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
        const isSelectable = isWeekSelectable(weekStart);
        const isSelected = isWeekSelected(weekStart);

        return (
            <React.Fragment key={index}>
                {index === 0 || !isSameMonth(weekStart, addWeeks(startOfCurrentWeek, index - 1)) ? (
                    <div className="col-span-7 text-left text-lg font-bold text-white py-2 px-4 bg-indigo-700 bg-opacity-50">
                        {format(weekStart, 'MMMM yyyy')}
                    </div>
                ) : null}
                <div
                    className={`grid grid-cols-7 gap-1 mb-1 items-center ${
                        isSelectable ? 'cursor-pointer hover:bg-indigo-200 hover:bg-opacity-50' : 'opacity-50'
                    } ${isSelected ? 'bg-indigo-600 text-white' : ''}`}
                    onClick={() => isSelectable && onSelectWeek(weekStart)}
                >
                    {days.map((day, dayIndex) => (
                        <div
                            key={dayIndex}
                            className={`text-center p-2 ${
                                isBefore(day, today) && !isSameWeek(day, today, { weekStartsOn: 1 })
                                    ? 'text-gray-400'
                                    : ''
                            }`}
                        >
                            {format(day, 'd')}
                        </div>
                    ))}
                </div>
            </React.Fragment>
        );
    };

    const weeks = Array.from({ length: 20 }, (_, i) => addWeeks(startOfCurrentWeek, i));

    return (
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-4 rounded-lg max-h-[600px] overflow-y-auto">
            <div className="grid grid-cols-7 gap-1 mb-2 sticky top-0 bg-indigo-800 z-10">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                    <div key={day} className="text-center text-white font-semibold">
                        {day}
                    </div>
                ))}
            </div>
            {weeks.map((week, index) => renderWeek(week, index))}
        </div>
    );
};

export default WeeklyCalendar;