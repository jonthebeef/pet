'use client';

interface DinoPetProps {
  isHappy: boolean;
}

export default function DinoPet({ isHappy }: DinoPetProps) {
  return (
    <div className="relative w-32 h-32">
      {/* Shadow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-3 bg-black/25 rounded-full blur-sm"></div>
      
      {/* Long Tail */}
      <div className="absolute bottom-6 right-2 w-24 h-8 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 rounded-full transform rotate-20 origin-left shadow-md">
        {/* Tail stripes */}
        <div className="absolute top-1 left-4 w-2 h-6 bg-orange-600 rounded-full opacity-60"></div>
        <div className="absolute top-1 left-8 w-2 h-6 bg-orange-600 rounded-full opacity-60"></div>
        <div className="absolute top-1 left-12 w-2 h-6 bg-orange-600 rounded-full opacity-60"></div>
        <div className="absolute top-1 left-16 w-2 h-6 bg-orange-600 rounded-full opacity-60"></div>
        
        {/* Tail spikes */}
        <div className="absolute top-0 right-2 w-0 h-0 border-l-3 border-r-3 border-b-6 border-transparent border-b-red-600"></div>
        <div className="absolute top-0 right-6 w-0 h-0 border-l-3 border-r-3 border-b-6 border-transparent border-b-red-600"></div>
        <div className="absolute top-0 right-10 w-0 h-0 border-l-3 border-r-3 border-b-6 border-transparent border-b-red-600"></div>
      </div>
      
      {/* Main Body */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-24 h-18 bg-gradient-to-br from-orange-300 via-orange-400 to-orange-600 rounded-t-3xl rounded-b-2xl shadow-lg">
        {/* Body texture spots */}
        <div className="absolute top-3 left-4 w-3 h-3 bg-orange-600 rounded-full opacity-40"></div>
        <div className="absolute top-6 left-2 w-2 h-2 bg-orange-600 rounded-full opacity-40"></div>
        <div className="absolute top-8 left-6 w-2 h-2 bg-orange-600 rounded-full opacity-40"></div>
        <div className="absolute top-3 right-4 w-3 h-3 bg-orange-600 rounded-full opacity-40"></div>
        <div className="absolute top-6 right-2 w-2 h-2 bg-orange-600 rounded-full opacity-40"></div>
      </div>
      
      {/* Head */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-20 h-16 bg-gradient-to-b from-orange-300 via-orange-400 to-orange-500 rounded-2xl shadow-md transform -rotate-1">
        {/* Snout */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-8 bg-gradient-to-b from-orange-400 to-orange-500 rounded-b-3xl">
          {/* Nostril holes */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 flex gap-2">
            <div className="w-2 h-1.5 bg-orange-700 rounded-full"></div>
            <div className="w-2 h-1.5 bg-orange-700 rounded-full"></div>
          </div>
        </div>
        
        {/* Eyes */}
        <div className="absolute top-2 left-2 w-5 h-5 bg-white rounded-full shadow-inner border border-orange-400">
          <div className={`absolute top-1 left-1 w-3 h-3 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full transition-all ${isHappy ? 'scale-110' : ''}`}>
            <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-orange-800 rounded-full"></div>
            <div className="absolute top-0 right-0.5 w-1 h-1 bg-yellow-400 rounded-full"></div>
            <div className="absolute top-0 right-0 w-0.5 h-0.5 bg-white rounded-full"></div>
          </div>
          {/* Eyelid when not happy */}
          {!isHappy && (
            <div className="absolute top-0 left-0 w-5 h-2.5 bg-orange-400 rounded-t-full"></div>
          )}
        </div>
        <div className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full shadow-inner border border-orange-400">
          <div className={`absolute top-1 left-1 w-3 h-3 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full transition-all ${isHappy ? 'scale-110' : ''}`}>
            <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-orange-800 rounded-full"></div>
            <div className="absolute top-0 right-0.5 w-1 h-1 bg-yellow-400 rounded-full"></div>
            <div className="absolute top-0 right-0 w-0.5 h-0.5 bg-white rounded-full"></div>
          </div>
          {/* Eyelid when not happy */}
          {!isHappy && (
            <div className="absolute top-0 left-0 w-5 h-2.5 bg-orange-400 rounded-t-full"></div>
          )}
        </div>
        
        {/* Mouth */}
        <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-3 border-b-3 border-orange-700 transition-all ${isHappy ? 'rounded-b-full border-orange-600' : 'border-orange-800'}`}>
          {/* Teeth when happy */}
          {isHappy && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-1">
              <div className="w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-white drop-shadow-sm"></div>
              <div className="w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-white drop-shadow-sm"></div>
              <div className="w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-white drop-shadow-sm"></div>
            </div>
          )}
        </div>
      </div>
      
      {/* Head Crest/Spikes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-2">
        <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-b-[12px] border-transparent border-b-red-500 drop-shadow-md"></div>
        <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[15px] border-transparent border-b-red-600 drop-shadow-md"></div>
        <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-b-[12px] border-transparent border-b-red-500 drop-shadow-md"></div>
      </div>
      
      {/* Back Spikes */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2">
        <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-b-[10px] border-transparent border-b-red-500"></div>
        <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-b-[12px] border-transparent border-b-red-600"></div>
        <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-b-[10px] border-transparent border-b-red-500"></div>
      </div>
      
      {/* Small Arms */}
      <div className="absolute bottom-10 left-1 w-4 h-8 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full transform -rotate-20 shadow-md">
        {/* Claws */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-0.5">
          <div className="w-0 h-0 border-l-1 border-r-1 border-t-2 border-transparent border-t-gray-600"></div>
          <div className="w-0 h-0 border-l-1 border-r-1 border-t-2 border-transparent border-t-gray-600"></div>
        </div>
      </div>
      <div className="absolute bottom-10 right-1 w-4 h-8 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full transform rotate-20 shadow-md">
        {/* Claws */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-0.5">
          <div className="w-0 h-0 border-l-1 border-r-1 border-t-2 border-transparent border-t-gray-600"></div>
          <div className="w-0 h-0 border-l-1 border-r-1 border-t-2 border-transparent border-t-gray-600"></div>
        </div>
      </div>
      
      {/* Powerful Legs */}
      <div className="absolute bottom-0 left-5 w-5 h-10 bg-gradient-to-b from-orange-400 via-orange-500 to-orange-700 rounded-b-2xl shadow-md">
        {/* Foot */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-7 h-3 bg-orange-700 rounded-full">
          {/* Toes */}
          <div className="absolute bottom-0 left-0 w-2 h-2 bg-orange-800 rounded-full"></div>
          <div className="absolute bottom-0 left-2 w-2 h-2 bg-orange-800 rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-orange-800 rounded-full"></div>
          {/* Claws */}
          <div className="absolute -bottom-1 left-0 w-0 h-0 border-l-1 border-r-1 border-t-3 border-transparent border-t-gray-700"></div>
          <div className="absolute -bottom-1 left-2 w-0 h-0 border-l-1 border-r-1 border-t-3 border-transparent border-t-gray-700"></div>
          <div className="absolute -bottom-1 right-0 w-0 h-0 border-l-1 border-r-1 border-t-3 border-transparent border-t-gray-700"></div>
        </div>
      </div>
      <div className="absolute bottom-0 right-5 w-5 h-10 bg-gradient-to-b from-orange-400 via-orange-500 to-orange-700 rounded-b-2xl shadow-md">
        {/* Foot */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-7 h-3 bg-orange-700 rounded-full">
          {/* Toes */}
          <div className="absolute bottom-0 left-0 w-2 h-2 bg-orange-800 rounded-full"></div>
          <div className="absolute bottom-0 left-2 w-2 h-2 bg-orange-800 rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-orange-800 rounded-full"></div>
          {/* Claws */}
          <div className="absolute -bottom-1 left-0 w-0 h-0 border-l-1 border-r-1 border-t-3 border-transparent border-t-gray-700"></div>
          <div className="absolute -bottom-1 left-2 w-0 h-0 border-l-1 border-r-1 border-t-3 border-transparent border-t-gray-700"></div>
          <div className="absolute -bottom-1 right-0 w-0 h-0 border-l-1 border-r-1 border-t-3 border-transparent border-t-gray-700"></div>
        </div>
      </div>
      
      {/* Happy stomping effect */}
      {isHappy && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex space-x-4 animate-bounce">
          <div className="w-3 h-1 bg-brown-400 rounded-full opacity-60"></div>
          <div className="w-2 h-1 bg-brown-300 rounded-full opacity-40"></div>
          <div className="w-3 h-1 bg-brown-400 rounded-full opacity-60"></div>
        </div>
      )}
    </div>
  );
}