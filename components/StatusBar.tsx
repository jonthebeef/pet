'use client';

import { Pet } from '@/lib/types';

interface StatusBarProps {
  pet: Pet;
}

export default function StatusBar({ pet }: StatusBarProps) {
  const getStatColor = (value: number, inverted: boolean = false) => {
    const adjustedValue = inverted ? 100 - value : value;
    if (adjustedValue >= 70) return 'bg-green-500';
    if (adjustedValue >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  const formatAge = (hours: number) => {
    const days = Math.floor(hours / 24);
    const remainingHours = Math.floor(hours % 24);
    return `${days}d ${remainingHours}h`;
  };
  
  return (
    <div className="space-y-2 p-4 bg-gray-800 rounded-lg">
      <div className="text-center mb-3">
        <h3 className="text-lg font-bold text-white">{pet.name}</h3>
        <p className="text-sm text-gray-400">Age: {formatAge(pet.age)}</p>
      </div>
      
      <div className="space-y-2">
        <div>
          <div className="flex justify-between text-xs text-gray-300 mb-1">
            <span>😊 Happiness</span>
            <span>{Math.round(pet.stats.happiness)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all ${getStatColor(pet.stats.happiness)}`}
              style={{ width: `${pet.stats.happiness}%` }}
            />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-xs text-gray-300 mb-1">
            <span>❤️ Health</span>
            <span>{Math.round(pet.stats.health)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all ${getStatColor(pet.stats.health)}`}
              style={{ width: `${pet.stats.health}%` }}
            />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-xs text-gray-300 mb-1">
            <span>🍕 Hunger</span>
            <span>{Math.round(pet.stats.hunger)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all ${getStatColor(pet.stats.hunger, true)}`}
              style={{ width: `${pet.stats.hunger}%` }}
            />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-xs text-gray-300 mb-1">
            <span>⚡ Energy</span>
            <span>{Math.round(pet.stats.energy)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all ${getStatColor(pet.stats.energy)}`}
              style={{ width: `${pet.stats.energy}%` }}
            />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-xs text-gray-300 mb-1">
            <span>🧼 Cleanliness</span>
            <span>{Math.round(pet.stats.cleanliness)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all ${getStatColor(pet.stats.cleanliness)}`}
              style={{ width: `${pet.stats.cleanliness}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}