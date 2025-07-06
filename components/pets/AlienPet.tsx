'use client';

interface AlienPetProps {
  isHappy: boolean;
}

export default function AlienPet({ isHappy }: AlienPetProps) {
  return (
    <div className="relative w-32 h-32">
      {/* Body */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-12 bg-gradient-to-b from-lime-400 to-lime-600 rounded-full"></div>
      
      {/* Head */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-gradient-to-b from-lime-300 to-lime-500 rounded-full">
        {/* Antennae */}
        <div className="absolute top-0 left-5 w-0.5 h-6 bg-lime-700 transform -rotate-12">
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
        </div>
        <div className="absolute top-0 right-5 w-0.5 h-6 bg-lime-700 transform rotate-12">
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-lime-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>
        
        {/* Eyes */}
        <div className="absolute top-8 left-4 w-5 h-6 bg-black rounded-full">
          <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full ${isHappy ? '' : 'translate-y-1'}`}></div>
          <div className="absolute bottom-1 right-1 w-1 h-1 bg-white rounded-full"></div>
        </div>
        <div className="absolute top-8 right-4 w-5 h-6 bg-black rounded-full">
          <div className={`absolute top-1 right-1 w-3 h-3 bg-white rounded-full ${isHappy ? '' : 'translate-y-1'}`}></div>
          <div className="absolute bottom-1 left-1 w-1 h-1 bg-white rounded-full"></div>
        </div>
        
        {/* Mouth */}
        <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 ${isHappy ? 'w-4 h-4 bg-lime-700 rounded-full' : 'w-6 h-0.5 bg-lime-700'}`}></div>
      </div>
      
      {/* Arms */}
      <div className="absolute bottom-4 left-0 w-2 h-8 bg-gradient-to-b from-lime-400 to-lime-600 rounded-full transform -rotate-12 animate-wiggle"></div>
      <div className="absolute bottom-4 right-0 w-2 h-8 bg-gradient-to-b from-lime-400 to-lime-600 rounded-full transform rotate-12 animate-wiggle" style={{ animationDelay: '0.5s' }}></div>
      
      {/* Legs */}
      <div className="absolute bottom-0 left-7 w-3 h-6 bg-gradient-to-b from-lime-500 to-lime-700 rounded-b-full"></div>
      <div className="absolute bottom-0 right-7 w-3 h-6 bg-gradient-to-b from-lime-500 to-lime-700 rounded-b-full"></div>
    </div>
  );
}