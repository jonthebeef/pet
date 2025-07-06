'use client';

interface DragonPetProps {
  isHappy: boolean;
}

export default function DragonPet({ isHappy }: DragonPetProps) {
  return (
    <div className="relative w-32 h-32">
      {/* Shadow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-3 bg-black/20 rounded-full blur-sm"></div>
      
      {/* Main Body */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-22 h-18 bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-700 rounded-t-3xl rounded-b-xl">
        {/* Body scales texture */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-2 left-3 w-2 h-2 bg-emerald-600 rounded-full"></div>
          <div className="absolute top-4 left-6 w-1.5 h-1.5 bg-emerald-600 rounded-full"></div>
          <div className="absolute top-6 left-4 w-1.5 h-1.5 bg-emerald-600 rounded-full"></div>
          <div className="absolute top-2 right-3 w-2 h-2 bg-emerald-600 rounded-full"></div>
          <div className="absolute top-4 right-6 w-1.5 h-1.5 bg-emerald-600 rounded-full"></div>
        </div>
      </div>
      
      {/* Head */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-18 h-16 bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 rounded-2xl transform rotate-2">
        {/* Snout */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-6 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-b-2xl"></div>
        
        {/* Eyes */}
        <div className="absolute top-3 left-2 w-4 h-4 bg-white rounded-full shadow-inner">
          <div className={`absolute top-1 left-1 w-2.5 h-2.5 bg-red-600 rounded-full transition-transform ${isHappy ? 'scale-110' : ''}`}>
            <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-red-800 rounded-full"></div>
            <div className="absolute top-0 right-0 w-0.5 h-0.5 bg-red-300 rounded-full"></div>
          </div>
        </div>
        <div className="absolute top-3 right-2 w-4 h-4 bg-white rounded-full shadow-inner">
          <div className={`absolute top-1 left-1 w-2.5 h-2.5 bg-red-600 rounded-full transition-transform ${isHappy ? 'scale-110' : ''}`}>
            <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-red-800 rounded-full"></div>
            <div className="absolute top-0 right-0 w-0.5 h-0.5 bg-red-300 rounded-full"></div>
          </div>
        </div>
        
        {/* Eyebrows */}
        <div className={`absolute top-1 left-1 w-5 h-1.5 bg-emerald-600 rounded-full transform ${isHappy ? '-rotate-12' : 'rotate-12'} transition-transform`}></div>
        <div className={`absolute top-1 right-1 w-5 h-1.5 bg-emerald-600 rounded-full transform ${isHappy ? 'rotate-12' : '-rotate-12'} transition-transform`}></div>
        
        {/* Nostrils */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
          <div className="w-1.5 h-1 bg-emerald-800 rounded-full"></div>
          <div className="w-1.5 h-1 bg-emerald-800 rounded-full"></div>
        </div>
        
        {/* Mouth */}
        <div className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-8 h-2 border-b-3 border-emerald-800 transition-all ${isHappy ? 'rounded-b-full border-emerald-700' : 'border-emerald-900'}`}></div>
        
        {/* Fire breath when happy */}
        {isHappy && (
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex space-x-1 animate-pulse">
            <div className="w-2 h-4 bg-gradient-to-t from-orange-500 to-yellow-400 rounded-full animate-bounce"></div>
            <div className="w-1.5 h-3 bg-gradient-to-t from-red-500 to-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-1 h-2 bg-gradient-to-t from-yellow-500 to-yellow-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        )}
      </div>
      
      {/* Horns */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-3">
        <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[12px] border-transparent border-b-yellow-600 drop-shadow-md"></div>
        <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[12px] border-transparent border-b-yellow-600 drop-shadow-md"></div>
      </div>
      
      {/* Wings */}
      <div className="absolute bottom-12 -left-2 w-16 h-12 bg-gradient-to-br from-emerald-300 via-emerald-500 to-emerald-700 rounded-full transform -rotate-12 animate-pulse" style={{ animationDuration: '2s' }}>
        {/* Wing membrane detail */}
        <div className="absolute inset-2 border-2 border-emerald-600 rounded-full opacity-50"></div>
        <div className="absolute top-3 left-4 w-1 h-6 bg-emerald-700 rounded-full"></div>
        <div className="absolute top-1 left-6 w-1 h-8 bg-emerald-700 rounded-full"></div>
        <div className="absolute top-2 right-3 w-1 h-7 bg-emerald-700 rounded-full"></div>
      </div>
      <div className="absolute bottom-12 -right-2 w-16 h-12 bg-gradient-to-bl from-emerald-300 via-emerald-500 to-emerald-700 rounded-full transform rotate-12 animate-pulse" style={{ animationDuration: '2s', animationDelay: '0.5s' }}>
        {/* Wing membrane detail */}
        <div className="absolute inset-2 border-2 border-emerald-600 rounded-full opacity-50"></div>
        <div className="absolute top-3 right-4 w-1 h-6 bg-emerald-700 rounded-full"></div>
        <div className="absolute top-1 right-6 w-1 h-8 bg-emerald-700 rounded-full"></div>
        <div className="absolute top-2 left-3 w-1 h-7 bg-emerald-700 rounded-full"></div>
      </div>
      
      {/* Tail */}
      <div className="absolute bottom-1 right-0 w-20 h-6 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transform rotate-45 origin-left">
        {/* Tail spikes */}
        <div className="absolute top-0 right-2 w-0 h-0 border-l-2 border-r-2 border-b-4 border-transparent border-b-emerald-700"></div>
        <div className="absolute top-0 right-6 w-0 h-0 border-l-2 border-r-2 border-b-4 border-transparent border-b-emerald-700"></div>
        <div className="absolute top-0 right-10 w-0 h-0 border-l-2 border-r-2 border-b-4 border-transparent border-b-emerald-700"></div>
      </div>
      
      {/* Treasure (when happy) */}
      {isHappy && (
        <div className="absolute bottom-0 left-2 flex space-x-1 animate-bounce">
          <div className="w-2 h-2 bg-yellow-400 rounded-full shadow-lg"></div>
          <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full shadow-md"></div>
          <div className="w-1 h-1 bg-amber-400 rounded-full shadow-sm"></div>
        </div>
      )}
    </div>
  );
}