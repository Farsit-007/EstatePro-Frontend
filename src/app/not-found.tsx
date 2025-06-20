// components/ErrorPage.jsx
import Link from 'next/link';

const ErrorPage = ({ statusCode = 404, message = "Page not found" }) => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Error Header */}
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-800 mb-2">{statusCode}</h1>
          <h2 className="text-2xl font-semibold text-gray-700">{message}</h2>
        </div>
        
        {/* Broken House Illustration */}
        <div className="relative mx-auto w-64 h-64 mb-10">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* House Base */}
            <path 
              d="M50,100 L50,180 L150,180 L150,100 L100,50 L50,100" 
              fill="#e2e8f0" 
              stroke="#cbd5e1" 
              strokeWidth="2" 
            />
            
            {/* Roof */}
            <path 
              d="M50,100 L100,50 L150,100" 
              fill="#fecaca" 
              stroke="#f87171" 
              strokeWidth="2" 
            />
            
            {/* Crack */}
            <path 
              d="M70,110 Q90,90 110,120 Q130,100 130,140" 
              fill="none" 
              stroke="#dc2626" 
              strokeWidth="3" 
              strokeDasharray="5,3"
            />
            
            {/* Broken Window */}
            <rect x="115" y="110" width="25" height="25" rx="2" fill="#f0f9ff" stroke="#93c5fd" strokeWidth="1" />
            <path 
              d="M115,122.5 L140,122.5 M127.5,110 L127.5,135" 
              stroke="#93c5fd" 
              strokeWidth="1" 
            />
            <path 
              d="M115,110 L140,135 M115,135 L140,110" 
              stroke="#dc2626" 
              strokeWidth="2" 
              strokeLinecap="round"
            />
            
            {/* Door with Warning */}
            <rect x="85" y="140" width="30" height="40" rx="2" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
            <circle cx="100" cy="165" r="2" fill="#f59e0b" />
            
            {/* Warning Symbol */}
            <path 
              d="M100,145 L105,155 L95,155 Z" 
              fill="#f87171" 
              stroke="#dc2626" 
              strokeWidth="1" 
            />
            <circle cx="100" cy="158" r="1.5" fill="#dc2626" />
            
            {/* Falling Chimney */}
            <g transform="translate(5, 10)">
              <rect x="130" y="70" width="15" height="25" fill="#9ca3af" stroke="#6b7280" strokeWidth="1" />
              <line x1="137.5" y1="95" x2="145" y2="110" stroke="#9ca3af" strokeWidth="2" strokeDasharray="3,2" />
              <rect x="140" y="105" width="15" height="10" rx="2" fill="#9ca3af" transform="rotate(20 140 105)" />
            </g>
            
            {/* Error Text */}
            <text 
              x="100" 
              y="160" 
              textAnchor="middle" 
              fill="#dc2626" 
              fontSize="18" 
              fontWeight="bold"
            >
              ERROR
            </text>
          </svg>
        </div>
        
        {/* Error Message */}
        <p className="text-gray-600 mb-8 px-4">
          Looks like something went wrong at home base. The page you&#39;re looking for might be under construction or doesn&rsquo;t exist.
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <div className="bg-black text-white font-medium py-3 px-6 rounded-full transition-all shadow-md cursor-pointer text-center">
              Return Home
            </div>
          </Link>
         
        </div>
        
        {/* Support Section */}
        <div className="mt-10 bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-white/70 shadow-sm">
          <div className="flex items-start">
            <div className="bg-blue-100 p-2 rounded-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-gray-600 text-sm">
              Need help? Contact our support team at <span className="text-gray-600">support@homesweethome.com</span>
            </p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center space-x-6 text-gray-500 text-sm mb-2">
          <span>Secure Connection</span>
          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
          <span>Encrypted Data</span>
          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
          <span>v3.8.2</span>
        </div>
        <p className="text-gray-500 text-sm">© 2023 HomeSweetHome • All rights reserved</p>
      </div>
    </div>
  );
};

export default ErrorPage;