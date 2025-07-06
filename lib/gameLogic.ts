import { Pet, PetStats, PetState, InteractionType, PetType } from './types';

const STAT_DECAY_RATES = {
  happiness: 2, // per hour
  health: 1, // per hour
  hunger: 5, // per hour (increases)
  energy: 3, // per hour
  cleanliness: 2, // per hour
};

const LIFESPAN_RANGES = {
  dragon: { min: 168, max: 336 }, // 7-14 days
  unicorn: { min: 240, max: 480 }, // 10-20 days
  robot: { min: 720, max: 1440 }, // 30-60 days
  alien: { min: 120, max: 240 }, // 5-10 days
  dino: { min: 192, max: 384 }, // 8-16 days
};

export function createPet(name: string, owner: string, ownerAge: number, type: PetType): Pet {
  const lifeRange = LIFESPAN_RANGES[type];
  const lifeExpectancy = Math.floor(Math.random() * (lifeRange.max - lifeRange.min + 1) + lifeRange.min);
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    name,
    owner,
    ownerAge,
    birthDate: new Date(),
    type,
    stats: {
      happiness: 80,
      health: 100,
      hunger: 20,
      energy: 100,
      cleanliness: 100,
    },
    state: 'happy',
    lastInteraction: new Date(),
    age: 0,
    lifeExpectancy,
  };
}

export function updatePetStats(pet: Pet): Pet {
  const now = new Date();
  const hoursSinceLastUpdate = (now.getTime() - pet.lastInteraction.getTime()) / (1000 * 60 * 60);
  
  const newStats: PetStats = {
    happiness: Math.max(0, pet.stats.happiness - STAT_DECAY_RATES.happiness * hoursSinceLastUpdate),
    health: Math.max(0, pet.stats.health - STAT_DECAY_RATES.health * hoursSinceLastUpdate),
    hunger: Math.min(100, pet.stats.hunger + STAT_DECAY_RATES.hunger * hoursSinceLastUpdate),
    energy: Math.max(0, pet.stats.energy - STAT_DECAY_RATES.energy * hoursSinceLastUpdate),
    cleanliness: Math.max(0, pet.stats.cleanliness - STAT_DECAY_RATES.cleanliness * hoursSinceLastUpdate),
  };
  
  // Health deteriorates faster if other stats are low
  if (newStats.hunger > 80 || newStats.cleanliness < 20) {
    newStats.health = Math.max(0, newStats.health - 5);
  }
  
  const newAge = pet.age + hoursSinceLastUpdate;
  
  // Check if pet should die
  const shouldDie = newStats.health === 0 || 
                   newAge >= pet.lifeExpectancy ||
                   (newStats.happiness === 0 && newStats.energy === 0);
  
  const newState = shouldDie ? 'dead' : 
                  newStats.health < 30 ? 'sick' :
                  newStats.energy < 20 ? 'sleeping' :
                  newStats.hunger > 70 ? 'sad' :
                  newStats.happiness > 70 ? 'happy' : 'sad';
  
  return {
    ...pet,
    stats: newStats,
    state: newState,
    lastInteraction: now,
    age: newAge,
    deathDate: shouldDie && !pet.deathDate ? now : pet.deathDate,
  };
}

export function interactWithPet(pet: Pet, interaction: InteractionType): Pet {
  if (pet.state === 'dead') return pet;
  
  let updatedPet = updatePetStats(pet);
  const stats = { ...updatedPet.stats };
  
  switch (interaction) {
    case 'feed':
      stats.hunger = Math.max(0, stats.hunger - 30);
      stats.happiness = Math.min(100, stats.happiness + 10);
      stats.health = Math.min(100, stats.health + 5);
      updatedPet.state = 'eating';
      break;
      
    case 'treat':
      stats.hunger = Math.max(0, stats.hunger - 10);
      stats.happiness = Math.min(100, stats.happiness + 20);
      updatedPet.state = 'happy';
      break;
      
    case 'play':
      if (stats.energy > 20) {
        stats.happiness = Math.min(100, stats.happiness + 25);
        stats.energy = Math.max(0, stats.energy - 15);
        stats.hunger = Math.min(100, stats.hunger + 10);
        updatedPet.state = 'playing';
      }
      break;
      
    case 'sleep':
      stats.energy = Math.min(100, stats.energy + 40);
      stats.health = Math.min(100, stats.health + 10);
      updatedPet.state = 'sleeping';
      break;
      
    case 'clean':
      stats.cleanliness = 100;
      stats.happiness = Math.min(100, stats.happiness + 15);
      stats.health = Math.min(100, stats.health + 10);
      break;
      
    case 'medicine':
      if (updatedPet.state === 'sick') {
        stats.health = Math.min(100, stats.health + 30);
        stats.happiness = Math.min(100, stats.happiness + 10);
      }
      break;
  }
  
  return {
    ...updatedPet,
    stats,
    lastInteraction: new Date(),
  };
}

export function getPetMood(pet: Pet): string {
  const { stats } = pet;
  
  if (pet.state === 'dead') return 'has passed away';
  if (stats.health < 30) return 'feeling sick';
  if (stats.hunger > 70) return 'very hungry';
  if (stats.energy < 20) return 'sleepy';
  if (stats.cleanliness < 30) return 'needs a bath';
  if (stats.happiness > 80) return 'super happy!';
  if (stats.happiness < 30) return 'feeling sad';
  
  return 'doing okay';
}

export type PetNeed = 'hungry' | 'tired' | 'dirty' | 'sick' | 'sad' | 'bored' | 'happy' | null;

export function getPetNeed(pet: Pet): PetNeed {
  const { stats } = pet;
  
  if (pet.state === 'dead') return null;
  if (stats.health < 30) return 'sick';
  if (stats.hunger > 80) return 'hungry';
  if (stats.energy < 20) return 'tired';
  if (stats.cleanliness < 30) return 'dirty';
  if (stats.happiness < 30) return 'sad';
  if (stats.happiness < 50 && stats.energy > 50) return 'bored';
  if (stats.happiness > 80 && stats.health > 80) return 'happy';
  
  return null;
}