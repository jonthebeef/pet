'use client';

import { InteractionType } from '@/lib/types';

interface InteractionButtonsProps {
  onInteraction: (type: InteractionType) => void;
  disabled: boolean;
}

export default function InteractionButtons({ onInteraction, disabled }: InteractionButtonsProps) {
  const buttons = [
    { type: 'feed' as InteractionType, icon: '🍖', label: 'Feed', color: 'bg-pixelpet-yellow' },
    { type: 'treat' as InteractionType, icon: '🍬', label: 'Treat', color: 'bg-pixelpet-pink' },
    { type: 'play' as InteractionType, icon: '🎮', label: 'Play', color: 'bg-pixelpet-blue' },
    { type: 'sleep' as InteractionType, icon: '😴', label: 'Sleep', color: 'bg-pixelpet-purple' },
    { type: 'clean' as InteractionType, icon: '🧼', label: 'Clean', color: 'bg-pixelpet-green' },
    { type: 'medicine' as InteractionType, icon: '💊', label: 'Medicine', color: 'bg-red-400' },
  ];
  
  return (
    <div className="grid grid-cols-3 gap-3 p-4">
      {buttons.map(({ type, icon, label, color }) => (
        <button
          key={type}
          onClick={() => onInteraction(type)}
          disabled={disabled}
          className={`${color} hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed 
                     text-white font-bold py-4 px-3 rounded-xl shadow-lg transform 
                     transition-all hover:scale-105 active:scale-95 flex flex-col items-center gap-1`}
        >
          <span className="text-2xl">{icon}</span>
          <span className="text-xs">{label}</span>
        </button>
      ))}
    </div>
  );
}