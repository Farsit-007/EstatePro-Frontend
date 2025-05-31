"use client"
// components/LoadingPage.jsx
import { useState, useEffect } from 'react';

const LoadingPage = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Loading Your Experience</h1>
        <p className="text-gray-600 mb-10">Just a moment while we prepare everything</p>
        
        {/* Liquid House Container */}
        <div className="relative mx-auto w-64 h-64 mb-8">
          <HouseSVG progress={progress} />
        </div>
        
        {/* Progress Indicator */}
        <div className="bg-white rounded-full shadow-inner p-1 max-w-md mx-auto mb-6">
          <div 
            className="bg-gradient-to-r from-blue-400 to-indigo-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="text-2xl font-bold text-gray-800 mb-1">{progress}%</div>
        <p className="text-gray-500 text-sm">
          {progress < 30 && "Preparing your space..."}
          {progress >= 30 && progress < 70 && "Filling with essentials..."}
          {progress >= 70 && progress < 100 && "Adding final touches..."}
          {progress === 100 && "Your home is ready!"}
        </p>
      </div>
      
      {/* Footer */}
      <div className="mt-12 text-center">
        <p className="text-gray-500 text-sm">© 2023 HomeSweetHome • All rights reserved</p>
      </div>
    </div>
  );
};

// House SVG with Liquid Effect
const HouseSVG = ({ progress  } : {progress : number}) => {
  // Calculate liquid height based on progress
  const liquidHeight = 180 - (progress / 100) * 150;
  
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* House Outline */}
      <path 
        d="M50,100 L50,180 L150,180 L150,100 L100,50 L50,100" 
        fill="none" 
        stroke="#94a3b8" 
        strokeWidth="2" 
      />
      
      {/* Door */}
      <rect x="85" y="140" width="30" height="40" rx="2" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1" />
      <circle cx="100" y="165" r="2" fill="#f59e0b" />
      
      {/* Window */}
      <rect x="115" y="110" width="25" height="25" rx="2" fill="#bfdbfe" stroke="#93c5fd" strokeWidth="1" />
      <line x1="127.5" y1="110" x2="127.5" y2="135" stroke="#93c5fd" strokeWidth="1" />
      <line x1="115" y1="122.5" x2="140" y2="122.5" stroke="#93c5fd" strokeWidth="1" />
      
      {/* Liquid Container */}
      <defs>
        <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
        
        <mask id="houseMask">
          <path d="M50,100 L50,180 L150,180 L150,100 L100,50 L50,100" fill="white" />
        </mask>
      </defs>
      
      {/* Liquid Filling */}
      <rect 
        x="50" 
        y={liquidHeight} 
        width="100" 
        height={200 - liquidHeight} 
        fill="url(#liquidGradient)" 
        mask="url(#houseMask)"
      />
      
      {/* Liquid Surface */}
      <path 
        d={`M50,${liquidHeight} L150,${liquidHeight}`} 
        stroke="#1d4ed8" 
        strokeWidth="1.5" 
      />
      
      {/* Bubbles */}
      {progress > 10 && (
        <>
          <circle cx="70" cy={liquidHeight - 15} r="3" fill="#dbeafe" opacity="0.8" />
          <circle cx="120" cy={liquidHeight - 8} r="2" fill="#dbeafe" opacity="0.7" />
          <circle cx="90" cy={liquidHeight - 25} r="4" fill="#dbeafe" opacity="0.6" />
          <circle cx="110" cy={liquidHeight - 35} r="3" fill="#dbeafe" opacity="0.9" />
        </>
      )}
      
      {/* Roof */}
      <path 
        d="M50,100 L100,50 L150,100" 
        fill="#f87171" 
        stroke="#ef4444" 
        strokeWidth="2" 
      />
      
      {/* Chimney */}
      <rect x="130" y="70" width="15" height="25" fill="#9ca3af" stroke="#6b7280" strokeWidth="1" />
      
      {/* Progress Indicator */}
      <text 
        x="100" 
        y="160" 
        textAnchor="middle" 
        fill="white" 
        fontSize="18" 
        fontWeight="bold"
        className="drop-shadow"
      >
        {progress}%
      </text>
    </svg>
  );
};

export default LoadingPage;