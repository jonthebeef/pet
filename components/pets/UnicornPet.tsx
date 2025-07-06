'use client';

interface UnicornPetProps {
  isHappy: boolean;
}

export default function UnicornPet({ isHappy }: UnicornPetProps) {
  return (
    <div className="relative w-32 h-32">
      {/* Shadow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-3 bg-black/15 rounded-full blur-sm"></div>
      
      {/* Main Body */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-20 h-16 bg-gradient-to-br from-white via-pink-50 to-purple-100 rounded-t-3xl rounded-b-2xl shadow-lg">
        {/* Body shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-t-3xl rounded-b-2xl"></div>
      </div>
      
      {/* Head */}
      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-b from-white via-pink-50 to-purple-100 rounded-2xl shadow-md">
        {/* Horn */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-r-[8px] border-b-[20px] border-transparent border-b-gradient-to-b from-yellow-300 to-yellow-500 drop-shadow-lg">
          {/* Horn spiral */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-16 bg-gradient-to-b from-yellow-400 to-amber-500 rounded-full opacity-80"></div>
        </div>
        
        {/* Horn glow effect */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-4 h-20 bg-yellow-200/30 rounded-full blur-sm animate-pulse"></div>
        
        {/* Eyes */}
        <div className="absolute top-4 left-2 w-4 h-4 bg-white rounded-full shadow-inner border border-purple-200">
          <div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full transition-all ${isHappy ? 'animate-pulse scale-110' : ''}`}>
            <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-purple-800 rounded-full"></div>
            <div className="absolute top-0 right-0.5 w-1 h-1 bg-purple-300 rounded-full"></div>
            <div className="absolute top-0 right-0 w-0.5 h-0.5 bg-white rounded-full"></div>
          </div>
          {/* Eyelashes */}
          <div className="absolute -top-1 left-1 w-0 h-0 border-l-[1px] border-r-[1px] border-b-[3px] border-transparent border-b-purple-400"></div>
          <div className="absolute -top-1 right-1 w-0 h-0 border-l-[1px] border-r-[1px] border-b-[3px] border-transparent border-b-purple-400"></div>
        </div>
        <div className="absolute top-4 right-2 w-4 h-4 bg-white rounded-full shadow-inner border border-purple-200">
          <div className={`absolute top-0.5 left-0.5 w-3 h-3 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full transition-all ${isHappy ? 'animate-pulse scale-110' : ''}`}>
            <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-purple-800 rounded-full"></div>
            <div className="absolute top-0 right-0.5 w-1 h-1 bg-purple-300 rounded-full"></div>
            <div className="absolute top-0 right-0 w-0.5 h-0.5 bg-white rounded-full"></div>
          </div>
          {/* Eyelashes */}
          <div className="absolute -top-1 left-1 w-0 h-0 border-l-[1px] border-r-[1px] border-b-[3px] border-transparent border-b-purple-400"></div>
          <div className="absolute -top-1 right-1 w-0 h-0 border-l-[1px] border-r-[1px] border-b-[3px] border-transparent border-b-purple-400"></div>
        </div>
        
        {/* Nose */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-2 h-2 bg-gradient-to-b from-pink-300 to-pink-400 rounded-full shadow-sm"></div>
        
        {/* Mouth */}
        <div className={`absolute bottom-3 left-1/2 -translate-x-1/2 w-6 h-2 border-b-2 border-pink-400 transition-all ${isHappy ? 'rounded-b-full border-pink-300' : 'border-pink-500'}`}></div>
        
        {/* Blush */}
        <div className="absolute bottom-8 left-0 w-3 h-2 bg-pink-200 rounded-full opacity-60"></div>
        <div className="absolute bottom-8 right-0 w-3 h-2 bg-pink-200 rounded-full opacity-60"></div>
      </div>
      
      {/* Magical Mane */}
      <div className="absolute bottom-18 left-0 w-14 h-14 overflow-hidden">
        <div className="absolute top-2 left-2 w-10 h-10 bg-gradient-to-br from-pink-300 via-purple-400 to-blue-400 rounded-full opacity-80 animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-0 left-4 w-8 h-8 bg-gradient-to-br from-purple-300 via-blue-400 to-cyan-400 rounded-full opacity-70 animate-float" style={{ animationDelay: '0.3s' }}></div>
        <div className="absolute top-4 left-0 w-6 h-6 bg-gradient-to-br from-blue-300 via-cyan-400 to-teal-400 rounded-full opacity-60 animate-float" style={{ animationDelay: '0.6s' }}></div>
      </div>
      
      <div className="absolute bottom-18 right-0 w-14 h-14 overflow-hidden">
        <div className="absolute top-2 right-2 w-10 h-10 bg-gradient-to-bl from-pink-300 via-purple-400 to-blue-400 rounded-full opacity-80 animate-float" style={{ animationDelay: '0.2s' }}></div>
        <div className="absolute top-0 right-4 w-8 h-8 bg-gradient-to-bl from-purple-300 via-blue-400 to-cyan-400 rounded-full opacity-70 animate-float" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-4 right-0 w-6 h-6 bg-gradient-to-bl from-blue-300 via-cyan-400 to-teal-400 rounded-full opacity-60 animate-float" style={{ animationDelay: '0.8s' }}></div>
      </div>
      
      {/* Legs */}
      <div className="absolute bottom-0 left-4 w-3 h-8 bg-gradient-to-b from-white via-pink-50 to-purple-100 rounded-b-full shadow-sm">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-2 bg-gray-300 rounded-full"></div>
      </div>
      <div className="absolute bottom-0 left-8 w-3 h-8 bg-gradient-to-b from-white via-pink-50 to-purple-100 rounded-b-full shadow-sm">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-2 bg-gray-300 rounded-full"></div>
      </div>
      <div className="absolute bottom-0 right-8 w-3 h-8 bg-gradient-to-b from-white via-pink-50 to-purple-100 rounded-b-full shadow-sm">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-2 bg-gray-300 rounded-full"></div>
      </div>
      <div className="absolute bottom-0 right-4 w-3 h-8 bg-gradient-to-b from-white via-pink-50 to-purple-100 rounded-b-full shadow-sm">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-2 bg-gray-300 rounded-full"></div>
      </div>
      
      {/* Magical Tail */}
      <div className="absolute bottom-4 right-0 w-20 h-16 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-br from-pink-300 via-purple-400 to-blue-400 rounded-full transform translate-x-8 animate-wiggle opacity-90">
          {/* Tail sparkles */}
          <div className="absolute top-2 left-4 w-1 h-1 bg-white rounded-full animate-ping"></div>
          <div className="absolute top-6 left-2 w-0.5 h-0.5 bg-yellow-300 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-10 left-6 w-1 h-1 bg-pink-300 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>
      
      {/* Rainbow sparkles when happy */}
      {isHappy && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-4 left-8 w-1 h-1 bg-pink-400 rounded-full animate-ping"></div>
          <div className="absolute top-8 right-12 w-0.5 h-0.5 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0.3s' }}></div>
          <div className="absolute top-12 left-16 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.6s' }}></div>
          <div className="absolute top-16 right-8 w-0.5 h-0.5 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '0.9s' }}></div>
          <div className="absolute top-6 left-20 w-1 h-1 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '1.2s' }}></div>
        </div>
      )}
    </div>
  );
}