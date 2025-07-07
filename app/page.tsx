'use client';

import { useState, useEffect } from 'react';
import { Pet, PetType, Player } from '@/lib/types';
import { createPet } from '@/lib/gameLogic';
import ProfileSelector from '@/components/ProfileSelector';
import GameLayout from '@/components/GameLayout';

export default function Home() {
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [currentPet, setCurrentPet] = useState<Pet | null>(null);
  
  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('pixelpet-save');
    if (savedData) {
      const { player, pet } = JSON.parse(savedData);
      if (pet && player) {
        // Convert date strings back to Date objects
        pet.birthDate = new Date(pet.birthDate);
        pet.lastInteraction = new Date(pet.lastInteraction);
        if (pet.deathDate) pet.deathDate = new Date(pet.deathDate);
        setCurrentPet(pet);
        setCurrentPlayer(player);
      }
    }
  }, []);
  
  const handleSelectProfile = (name: string, age: number, petName: string, petType: PetType) => {
    const newPlayer: Player = { name, age, pets: [] };
    const newPet = createPet(petName, name, age, petType);
    setCurrentPlayer(newPlayer);
    setCurrentPet(newPet);
    
    // Save to localStorage
    localStorage.setItem('pixelpet-save', JSON.stringify({
      player: newPlayer,
      pet: newPet,
    }));
  };
  
  const handlePetUpdate = (updatedPet: Pet) => {
    setCurrentPet(updatedPet);
    
    // Save to localStorage
    localStorage.setItem('pixelpet-save', JSON.stringify({
      player: currentPlayer,
      pet: updatedPet,
    }));
  };
  
  const handleNewPet = () => {
    setCurrentPet(null);
    setCurrentPlayer(null);
    localStorage.removeItem('pixelpet-save');
  };
  
  if (!currentPet || !currentPlayer) {
    return <ProfileSelector onSelectProfile={handleSelectProfile} />;
  }
  
  return (
    <GameLayout 
      pet={currentPet} 
      onPetUpdate={handlePetUpdate}
      playerName={currentPlayer.name}
      playerAge={currentPlayer.age}
      onNewPet={handleNewPet}
    />
  );
}