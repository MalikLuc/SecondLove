'use client';

import { useState, useEffect } from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';

export default function Register() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        fullName: '',
        address: '',
        telephone: '',
    });

    useEffect(() => {
        console.log('Step changed to:', step);
    }, [step]);

    const handleStepOneSubmit = (email: string, password: string) => {
        setFormData(prevData => ({ ...prevData, email, password }));
        setStep(2);
    };

    const handleStepTwoSubmit = (fullName: string, address: string, telephone: string) => {
        setFormData(prevData => ({ ...prevData, fullName, address, telephone }));
        console.log('Registration complete:', formData);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center p-4">
            <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg p-8 max-w-md w-full">
                <h1 className="text-3xl font-bold mb-6 text-white text-center">Register</h1>
                <div className="space-y-4">
                    {step === 1 ? (
                        <StepOne onSubmit={handleStepOneSubmit} />
                    ) : (
                        <StepTwo onSubmit={handleStepTwoSubmit} />
                    )}
                </div>
            </div>
        </div>
    );
}