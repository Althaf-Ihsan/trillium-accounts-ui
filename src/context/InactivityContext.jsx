import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // or useNavigate in React Router v6+

const InactivityContext = createContext();

export const InactivityProvider = ({ children }) => {
    const navigate = useNavigate();
    const [timeout, setTimeoutDuration] = useState(10000); // 10 seconds
    const [timer, setTimer] = useState(timeout);

    const resetTimer = () => {
        setTimer(timeout);
    };

    useEffect(() => {
        const handleActivity = () => {
            resetTimer();
        };

        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('keydown', handleActivity);

        const timerId = setTimeout(() => {
            setTimer(0);
        }, timer);

        if (timer === 0) {
            navigate('/login', { replace: true }); // Redirect to login and replace history
        }

        return () => {
            clearTimeout(timerId);
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('keydown', handleActivity);
        };
    }, [timer, navigate]);

    return (
        <InactivityContext.Provider value={{ resetTimer }}>
            {children}
        </InactivityContext.Provider>
    );
};

export const useInactivity = () => {
    return useContext(InactivityContext);
};
