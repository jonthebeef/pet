'use client';

import { Pet } from '@/lib/types';
import DragonPet from './pets/DragonPet';
import UnicornPet from './pets/UnicornPet';
import RobotPet from './pets/RobotPet';
import AlienPet from './pets/AlienPet';
import DinoPet from './pets/DinoPet';

interface PetDisplayProps {
  pet: Pet;
}

export default function PetDisplay({ pet }: PetDisplayProps) {
  const petComponents = {
    dragon: DragonPet,
    unicorn: UnicornPet,
    robot: RobotPet,
    alien: AlienPet,
    dino: DinoPet,
  };
  
  const PetComponent = petComponents[pet.type];
  const isHappy = pet.state === 'happy' || pet.state === 'playing';
  
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className={`${pet.state === 'sleeping' ? 'animate-pulse' : 'animate-float'}`}>
        <PetComponent isHappy={isHappy} />
      </div>
      
      {pet.state === 'sleeping' && (
        <div className="absolute top-0 right-0 text-2xl animate-bounce-slow">
          💤
        </div>
      )}
      {pet.state === 'eating' && (
        <div className="absolute bottom-0 left-0 text-2xl animate-wiggle">
          🍖
        </div>
      )}
      {pet.state === 'playing' && (
        <div className="absolute top-0 left-0 text-2xl animate-spin">
          ⚽
        </div>
      )}
    </div>
  );
}