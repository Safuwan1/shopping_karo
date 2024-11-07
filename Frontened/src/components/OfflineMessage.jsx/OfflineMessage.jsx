import React, { useState, useEffect } from 'react';

const OfflineMessage = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    // Event listeners for online and offline status
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="fixed top-0 left-0 w-full bg-red-500 text-white text-center py-2 z-50">
      <p>No internet connection. Please check your network settings.</p>
    </div>
  );
};

export default OfflineMessage;
