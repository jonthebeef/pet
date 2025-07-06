'use client';

interface UnicornPetProps {
  isHappy: boolean;
}

export default function UnicornPet({ isHappy }: UnicornPetProps) {
  return (
    <div className="relative w-32 h-32">
      {/* Body */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-16 bg-gradient-to-b from-purple-300 to-pink-300 rounded-t-full"></div>
      
      {/* Head */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-b from-purple-200 to-purple-300 rounded-full">
        {/* Horn */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-[16px] border-transparent border-b-yellow-400"></div>
        
        {/* Eyes */}
        <div className="absolute top-5 left-3 w-3 h-3 bg-white rounded-full">
          <div className={`absolute top-1 left-1 w-1.5 h-1.5 bg-black rounded-full ${isHappy ? 'animate-pulse' : ''}`}></div>
        </div>
        <div className="absolute top-5 right-3 w-3 h-3 bg-white rounded-full">
          <div className={`absolute top-1 left-1 w-1.5 h-1.5 bg-black rounded-full ${isHappy ? 'animate-pulse' : ''}`}></div>
        </div>
        
        {/* Nose */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-2 h-2 bg-pink-400 rounded-full"></div>
        
        {/* Mouth */}
        <div className={`absolute bottom-3 left-1/2 -translate-x-1/2 w-6 h-1.5 border-b-2 border-purple-500 ${isHappy ? 'rounded-b-full' : ''}`}></div>
      </div>
      
      {/* Mane */}
      <div className="absolute bottom-16 left-2 w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full opacity-70 animate-float" style={{ animationDelay: '0.2s' }}></div>
      <div className="absolute bottom-14 right-2 w-10 h-10 bg-gradient-to-bl from-blue-400 to-purple-400 rounded-full opacity-70 animate-float" style={{ animationDelay: '0.4s' }}></div>
      
      {/* Legs */}
      <div className="absolute bottom-0 left-6 w-3 h-8 bg-gradient-to-b from-purple-300 to-purple-400 rounded-b-full"></div>
      <div className="absolute bottom-0 right-6 w-3 h-8 bg-gradient-to-b from-purple-300 to-purple-400 rounded-b-full"></div>
      
      {/* Tail */}
      <div className="absolute bottom-4 right-0 w-16 h-16 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 rounded-full transform translate-x-6 animate-wiggle"></div>
      </div>
    </div>
  );
}