"use client"
import { PenTool } from 'lucide-react';
// components/MaintenanceModal.jsx
import { useState, useEffect } from 'react';

const MaintenanceModal = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [countdown, setCountdown] = useState(24 * 60 * 60); // 24 hours in seconds
  
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    
    return () => {
      clearInterval(timer);
      document.body.style.overflow = 'auto';
    };
  }, [isVisible]);
  
  if (!isVisible) return null;
  
  // Calculate hours, minutes, seconds
  const hours = Math.floor(countdown / 3600);
  const minutes = Math.floor((countdown % 3600) / 60);
  const seconds = countdown % 60;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
        <div className="p-8 relative">
          {/* Close button */}
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 mb-4">
              <PenTool className="text-white text-3xl" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Under Maintenance</h1>
            <p className="text-gray-400">
              We&#39;re improving our platform for a better experience
            </p>
          </div>
          
          {/* Countdown */}
          <div className="bg-gray-800/50 rounded-xl p-6 mb-8">
            <div className="flex justify-center space-x-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-white bg-gray-900 rounded-lg py-4 px-6">
                  {hours.toString().padStart(2, '0')}
                </div>
                <div className="text-gray-400 mt-2">Hours</div>
              </div>
              <div className="text-4xl font-bold text-white flex items-center">:</div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white bg-gray-900 rounded-lg py-4 px-6">
                  {minutes.toString().padStart(2, '0')}
                </div>
                <div className="text-gray-400 mt-2">Minutes</div>
              </div>
              <div className="text-4xl font-bold text-white flex items-center">:</div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white bg-gray-900 rounded-lg py-4 px-6">
                  {seconds.toString().padStart(2, '0')}
                </div>
                <div className="text-gray-400 mt-2">Seconds</div>
              </div>
            </div>
          </div>
          
         
          
          
        </div>
      
      </div>
    </div>
  );
};

export default MaintenanceModal;