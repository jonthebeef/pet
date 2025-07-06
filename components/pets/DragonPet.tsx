'use client';

interface DragonPetProps {
  isHappy: boolean;
}

export default function DragonPet({ isHappy }: DragonPetProps) {
  return (
    <div className="relative w-32 h-32">
      {/* Body */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-16 bg-gradient-to-b from-green-400 to-green-600 rounded-t-full"></div>
      
      {/* Head */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-b from-green-500 to-green-600 rounded-full">
        {/* Eyes */}
        <div className="absolute top-4 left-3 w-3 h-3 bg-white rounded-full">
          <div className={`absolute top-1 left-1 w-1.5 h-1.5 bg-black rounded-full ${isHappy ? '' : 'translate-y-1'}`}></div>
        </div>
        <div className="absolute top-4 right-3 w-3 h-3 bg-white rounded-full">
          <div className={`absolute top-1 left-1 w-1.5 h-1.5 bg-black rounded-full ${isHappy ? '' : 'translate-y-1'}`}></div>
        </div>
        
        {/* Nostrils */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
          <div className="w-1 h-1 bg-green-800 rounded-full"></div>
          <div className="w-1 h-1 bg-green-800 rounded-full"></div>
        </div>
        
        {/* Mouth */}
        <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-2 border-b-2 border-green-800 ${isHappy ? 'rounded-b-full' : 'rounded-t-full rotate-180'}`}></div>
      </div>
      
      {/* Wings */}
      <div className="absolute bottom-8 left-0 w-12 h-8 bg-gradient-to-r from-green-600 to-green-500 rounded-tl-full rounded-br-full transform -rotate-12 animate-wiggle"></div>
      <div className="absolute bottom-8 right-0 w-12 h-8 bg-gradient-to-l from-green-600 to-green-500 rounded-tr-full rounded-bl-full transform rotate-12 animate-wiggle" style={{ animationDelay: '0.5s' }}></div>
      
      {/* Tail */}
      <div className="absolute bottom-0 right-2 w-16 h-4 bg-gradient-to-r from-green-600 to-green-500 rounded-full transform rotate-45 origin-left"></div>
      
      {/* Spikes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-1">
        <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-orange-500"></div>
        <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-orange-500"></div>
        <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-orange-500"></div>
      </div>
    </div>
  );
}