'use client';

import { useState, useEffect } from 'react';
import { Pet, InteractionType } from '@/lib/types';
import { updatePetStats, interactWithPet, getPetMood } from '@/lib/gameLogic';
import PetDisplay from './PetDisplay';
import StatusBar from './StatusBar';
import InteractionButtons from './InteractionButtons';

interface TamagotchiDeviceProps {
  pet: Pet;
  onPetUpdate: (pet: Pet) => void;
}

export default function TamagotchiDevice({ pet: initialPet, onPetUpdate }: TamagotchiDeviceProps) {
  const [pet, setPet] = useState(initialPet);
  const [showMessage, setShowMessage] = useState('');
  
  // Update pet stats every second
  useEffect(() => {
    const interval = setInterval(() => {
      setPet(currentPet => {
        const updatedPet = updatePetStats(currentPet);
        return updatedPet;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Notify parent of pet changes separately
  useEffect(() => {
    onPetUpdate(pet);
  }, [pet, onPetUpdate]);
  
  const handleInteraction = (type: InteractionType) => {
    if (pet.state === 'dead') {
      setShowMessage('Your pet has passed away... 😢');
      setTimeout(() => setShowMessage(''), 3000);
      return;
    }
    
    const updatedPet = interactWithPet(pet, type);
    setPet(updatedPet);
    
    // Show feedback message
    const messages = {
      feed: 'Yum yum! 🍖',
      treat: 'Delicious! 🍬',
      play: pet.stats.energy > 20 ? 'So fun! 🎮' : 'Too tired to play... 😴',
      sleep: 'Zzz... 😴',
      clean: 'All clean! ✨',
      medicine: pet.state === 'sick' ? 'Feeling better! 💊' : 'Not sick right now',
    };
    
    setShowMessage(messages[type as keyof typeof messages] || '');
    setTimeout(() => setShowMessage(''), 2000);
  };
  
  const mood = getPetMood(pet);
  
  return (
    <div className="max-w-md mx-auto">
      <div className="tamagotchi-screen p-6">
        <div className="led-display h-64 relative overflow-hidden mb-4">
          <PetDisplay pet={pet} />
          {showMessage && (
            <div className="absolute bottom-2 left-0 right-0 text-center text-sm animate-bounce">
              {showMessage}
            </div>
          )}
          {!showMessage && (
            <div className="absolute bottom-2 left-0 right-0 text-center text-xs text-gray-600">
              {pet.name} is {mood}
            </div>
          )}
        </div>
        
        <StatusBar pet={pet} />
        
        <InteractionButtons 
          onInteraction={handleInteraction}
          disabled={pet.state === 'dead'}
        />
      </div>
    </div>
  );
}