// src/hooks/useIdleTimeout.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UseIdleTimeout = (timeout = 900000) => { // 15 minutes in milliseconds
  const navigate = useNavigate();
  
  useEffect(() => {
    let timeoutId;

    const resetTimeout = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        localStorage.clear();
        navigate('/login', { replace: true }); 
        window.history.pushState(null, null, '/login'); 
      }, timeout);
    };

    const handleActivity = () => {
      resetTimeout();
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);

    resetTimeout(); 

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
    };
  }, [navigate, timeout]);
};

export default UseIdleTimeout;
