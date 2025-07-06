'use client';

interface DinoPetProps {
  isHappy: boolean;
}

export default function DinoPet({ isHappy }: DinoPetProps) {
  return (
    <div className="relative w-32 h-32">
      {/* Tail */}
      <div className="absolute bottom-2 right-0 w-20 h-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transform rotate-12 origin-left"></div>
      
      {/* Body */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-16 bg-gradient-to-b from-orange-400 to-orange-600 rounded-t-full"></div>
      
      {/* Head */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-16 h-14 bg-gradient-to-b from-orange-400 to-orange-500 rounded-t-full">
        {/* Eyes */}
        <div className="absolute top-3 left-3 w-3 h-3 bg-white rounded-full">
          <div className={`absolute top-0.5 left-0.5 w-2 h-2 bg-black rounded-full ${isHappy ? '' : 'translate-y-0.5'}`}></div>
        </div>
        <div className="absolute top-3 right-3 w-3 h-3 bg-white rounded-full">
          <div className={`absolute top-0.5 left-0.5 w-2 h-2 bg-black rounded-full ${isHappy ? '' : 'translate-y-0.5'}`}></div>
        </div>
        
        {/* Nostrils */}
        <div className="absolute top-7 left-1/2 -translate-x-1/2 flex gap-1">
          <div className="w-1 h-1 bg-orange-700 rounded-full"></div>
          <div className="w-1 h-1 bg-orange-700 rounded-full"></div>
        </div>
        
        {/* Mouth */}
        <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-10 h-2 border-b-2 border-orange-700 ${isHappy ? 'rounded-b-full' : ''}`}></div>
        
        {/* Teeth */}
        {isHappy && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            <div className="w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-white"></div>
            <div className="w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-white"></div>
          </div>
        )}
      </div>
      
      {/* Spikes */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-1">
        <div className="w-0 h-0 border-l-3 border-r-3 border-b-6 border-transparent border-b-red-500"></div>
        <div className="w-0 h-0 border-l-3 border-r-3 border-b-6 border-transparent border-b-red-500"></div>
        <div className="w-0 h-0 border-l-3 border-r-3 border-b-6 border-transparent border-b-red-500"></div>
      </div>
      
      {/* Arms */}
      <div className="absolute bottom-8 left-2 w-3 h-6 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full transform -rotate-12"></div>
      <div className="absolute bottom-8 right-2 w-3 h-6 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full transform rotate-12"></div>
      
      {/* Legs */}
      <div className="absolute bottom-0 left-6 w-4 h-8 bg-gradient-to-b from-orange-500 to-orange-700 rounded-b-lg"></div>
      <div className="absolute bottom-0 right-6 w-4 h-8 bg-gradient-to-b from-orange-500 to-orange-700 rounded-b-lg"></div>
    </div>
  );
}