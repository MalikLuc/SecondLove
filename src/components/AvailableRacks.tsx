import React, { useState } from 'react';

interface Rack {
    id: string;
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

interface AvailableRacksProps {
    startDate: Date | null;
    endDate: Date | null;
    onSelectRack: (rackId: string) => void;
}

const AvailableRacks: React.FC<AvailableRacksProps> = ({ startDate, endDate, onSelectRack }) => {
    const [selectedRack, setSelectedRack] = useState<string | null>(null);

    // This is a mock function to simulate fetching available racks
    // In a real application, this would be an API call
    const fetchAvailableRacks = (start: Date, end: Date): Rack[] => {
        // Mock data
        return [
            { id: 'rack1', name: 'Rack A', x: 50, y: 50, width: 80, height: 30 },
            { id: 'rack2', name: 'Rack B', x: 150, y: 50, width: 80, height: 30 },
            { id: 'rack3', name: 'Rack C', x: 50, y: 100, width: 80, height: 30 },
            { id: 'rack4', name: 'Rack D', x: 150, y: 100, width: 80, height: 30 },
        ];
    };

    if (!startDate || !endDate) {
        return <p className="text-white">Please select a date range to view available racks.</p>;
    }

    const availableRacks = fetchAvailableRacks(startDate, endDate);

    const handleRackClick = (rackId: string) => {
        setSelectedRack(rackId);
        onSelectRack(rackId);
    };

    return (
        <div className="mt-4">
            <h3 className="text-xl font-semibold mb-4 text-white">Available Racks:</h3>
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-4 rounded-lg">
                <div className="relative" style={{ paddingBottom: '66.67%' }}> {/* 2:3 aspect ratio */}
                    <svg
                        className="absolute top-0 left-0 w-full h-full"
                        viewBox="0 0 300 200"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        {/* Shop outline */}
                        <rect x="10" y="10" width="280" height="180" fill="none" stroke="white" strokeWidth="2" />

                        {/* Entrance */}
                        <rect x="135" y="10" width="30" height="10" fill="white" />
                        <text x="150" y="35" textAnchor="middle" fill="white" fontSize="12">Entrance</text>

                        {/* Racks */}
                        {availableRacks.map((rack) => (
                            <g key={rack.id} onClick={() => handleRackClick(rack.id)} className="cursor-pointer">
                                <rect
                                    x={rack.x}
                                    y={rack.y}
                                    width={rack.width}
                                    height={rack.height}
                                    fill={selectedRack === rack.id ? "rgb(99 102 241)" : "rgb(199 210 254)"}
                                    stroke="white"
                                    strokeWidth="2"
                                />
                                <text
                                    x={rack.x + rack.width / 2}
                                    y={rack.y + rack.height / 2 + 5}
                                    textAnchor="middle"
                                    fill="black"
                                    fontSize="12"
                                >
                                    {rack.name}
                                </text>
                            </g>
                        ))}
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default AvailableRacks;