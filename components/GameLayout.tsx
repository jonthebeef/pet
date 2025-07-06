'use client';

import { Pet } from '@/lib/types';
import TamagotchiDevice from './TamagotchiDevice';
import Chat from './Chat';

interface GameLayoutProps {
  pet: Pet;
  onPetUpdate: (pet: Pet) => void;
  playerName: string;
  playerAge: number;
}

export default function GameLayout({ pet, onPetUpdate, playerName, playerAge }: GameLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-tamagotchi-pink to-tamagotchi-purple bg-clip-text text-transparent">
            {playerName}'s Tamagotchi
          </h1>
          <p className="text-gray-600 mt-1">Take good care of {pet.name}!</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6" style={{ height: '80vh' }}>
          {/* Left side - Tamagotchi Device (2/5 width on large screens) */}
          <div className="lg:col-span-2 h-full">
            <div className="h-full flex items-center justify-center">
              <TamagotchiDevice pet={pet} onPetUpdate={onPetUpdate} />
            </div>
          </div>
          
          {/* Right side - Chat (3/5 width on large screens) */}
          <div className="lg:col-span-3 h-full">
            <Chat pet={pet} ownerAge={playerAge} ownerName={playerName} />
          </div>
        </div>
        
        {pet.state === 'dead' && (
          <div className="mt-8 p-6 bg-gray-800 rounded-xl text-center text-white max-w-2xl mx-auto">
            <h2 className="text-2xl mb-4">Rest in Peace, {pet.name} 🌈</h2>
            <p className="mb-4">
              {pet.name} lived for {Math.floor(pet.age / 24)} days and {Math.floor(pet.age % 24)} hours.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-tamagotchi-pink to-tamagotchi-purple text-white font-bold py-3 px-6 rounded-xl transform transition-all hover:scale-105 active:scale-95"
            >
              Adopt a New Pet
            </button>
          </div>
        )}
      </div>
    </div>
  );
}