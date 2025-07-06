'use client';

interface RobotPetProps {
  isHappy: boolean;
}

export default function RobotPet({ isHappy }: RobotPetProps) {
  return (
    <div className="relative w-32 h-32">
      {/* Body */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-16 bg-gradient-to-b from-gray-400 to-gray-600 rounded-lg">
        {/* Chest panel */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-8 bg-gray-700 rounded">
          <div className="absolute top-1 left-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-400 rounded-full"></div>
        </div>
      </div>
      
      {/* Head */}
      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 w-16 h-14 bg-gradient-to-b from-gray-300 to-gray-500 rounded-lg">
        {/* Antenna */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-4 bg-gray-600">
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        </div>
        
        {/* Eyes */}
        <div className="absolute top-4 left-3 w-4 h-4 bg-cyan-400 rounded-full border-2 border-gray-700">
          <div className={`absolute top-1 left-1 w-2 h-2 bg-black rounded-full ${isHappy ? 'animate-ping' : ''}`}></div>
        </div>
        <div className="absolute top-4 right-3 w-4 h-4 bg-cyan-400 rounded-full border-2 border-gray-700">
          <div className={`absolute top-1 left-1 w-2 h-2 bg-black rounded-full ${isHappy ? 'animate-ping' : ''}`}></div>
        </div>
        
        {/* Mouth */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-3 bg-gray-700 rounded">
          {isHappy && (
            <div className="flex justify-center items-center h-full gap-0.5">
              <div className="w-1 h-2 bg-cyan-400"></div>
              <div className="w-1 h-2 bg-cyan-400"></div>
              <div className="w-1 h-2 bg-cyan-400"></div>
            </div>
          )}
        </div>
      </div>
      
      {/* Arms */}
      <div className="absolute bottom-8 left-1 w-3 h-10 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full transform -rotate-12"></div>
      <div className="absolute bottom-8 right-1 w-3 h-10 bg-gradient-to-b from-gray-400 to-gray-600 rounded-full transform rotate-12"></div>
      
      {/* Legs */}
      <div className="absolute bottom-0 left-6 w-4 h-8 bg-gradient-to-b from-gray-500 to-gray-700 rounded-b-lg"></div>
      <div className="absolute bottom-0 right-6 w-4 h-8 bg-gradient-to-b from-gray-500 to-gray-700 rounded-b-lg"></div>
    </div>
  );
}