import { Pet, PetStats, PetState, InteractionType, PetType } from './types';

const STAT_DECAY_RATES = {
  happiness: 8, // per hour (increased for more visible changes)
  health: 2, // per hour (increased slightly)
  hunger: 12, // per hour (increases - made faster)
  energy: 6, // per hour (increased)
  cleanliness: 10, // per hour (increased for more visible changes)
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
  // Use a base decay rate per update (called every second)
  const decayPerSecond = 1 / 3600; // 1 hour = 3600 seconds
  
  const newStats: PetStats = {
    happiness: Math.max(0, pet.stats.happiness - STAT_DECAY_RATES.happiness * decayPerSecond),
    health: Math.max(0, pet.stats.health - STAT_DECAY_RATES.health * decayPerSecond),
    hunger: Math.min(100, pet.stats.hunger + STAT_DECAY_RATES.hunger * decayPerSecond),
    energy: Math.max(0, pet.stats.energy - STAT_DECAY_RATES.energy * decayPerSecond),
    cleanliness: Math.max(0, pet.stats.cleanliness - STAT_DECAY_RATES.cleanliness * decayPerSecond),
  };
  
  // Health deteriorates faster if other stats are low
  if (newStats.hunger > 80 || newStats.cleanliness < 20) {
    newStats.health = Math.max(0, newStats.health - 10);
  }
  
  // Random chance of getting sick
  if (Math.random() < 0.02 && newStats.health > 30) { // 2% chance per update
    newStats.health = Math.max(20, newStats.health - 30);
  }
  
  const newAge = pet.age + decayPerSecond; // Age increases by 1/3600 per second = 1 hour per 3600 seconds
  
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
    age: newAge,
    deathDate: shouldDie && !pet.deathDate ? now : pet.deathDate,
    // Don't update lastInteraction here - only update it on actual interactions
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
      stats.energy = Math.max(0, stats.energy - 5); // Digestion makes slightly tired
      stats.cleanliness = Math.max(0, stats.cleanliness - 5); // Messy eating
      updatedPet.state = 'eating';
      break;
      
    case 'treat':
      stats.hunger = Math.max(0, stats.hunger - 10);
      stats.happiness = Math.min(100, stats.happiness + 20);
      stats.energy = Math.min(100, stats.energy + 5); // Sugar rush!
      stats.cleanliness = Math.max(0, stats.cleanliness - 3); // Slightly messy
      break;
      
    case 'play':
      if (stats.energy > 20) {
        stats.happiness = Math.min(100, stats.happiness + 25);
        stats.energy = Math.max(0, stats.energy - 15);
        stats.hunger = Math.min(100, stats.hunger + 10);
        stats.cleanliness = Math.max(0, stats.cleanliness - 15); // Playing makes dirty!
        stats.health = Math.min(100, stats.health + 3); // Exercise is healthy
        updatedPet.state = 'playing';
      }
      break;
      
    case 'sleep':
      stats.energy = Math.min(100, stats.energy + 40);
      stats.health = Math.min(100, stats.health + 10);
      stats.hunger = Math.min(100, stats.hunger + 5); // Get hungry while sleeping
      stats.happiness = Math.min(100, stats.happiness + 5); // Good rest = happy
      updatedPet.state = 'sleeping';
      break;
      
    case 'clean':
      stats.cleanliness = 100;
      stats.happiness = Math.min(100, stats.happiness + 15);
      stats.health = Math.min(100, stats.health + 10);
      stats.energy = Math.max(0, stats.energy - 5); // Takes effort to bathe
      break;
      
    case 'medicine':
      if (updatedPet.state === 'sick') {
        stats.health = Math.min(100, stats.health + 30);
        stats.happiness = Math.max(0, stats.happiness - 5); // Medicine tastes bad
        stats.energy = Math.max(0, stats.energy - 10); // Medicine makes drowsy
      }
      break;
  }
  
  // Keep temporary states (eating, playing) but for others, recalculate based on stats
  let finalState = updatedPet.state;
  if (updatedPet.state !== 'eating' && updatedPet.state !== 'playing' && updatedPet.state !== 'sleeping') {
    finalState = stats.health < 30 ? 'sick' :
                stats.energy < 20 ? 'sleeping' :
                stats.hunger > 70 ? 'sad' :
                stats.happiness > 70 ? 'happy' : 'sad';
  }
  
  return {
    ...updatedPet,
    stats,
    state: finalState,
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
  if (stats.hunger > 70) return 'hungry'; // Lower threshold
  if (stats.energy < 30) return 'tired'; // Higher threshold
  if (stats.cleanliness < 40) return 'dirty'; // Higher threshold
  if (stats.happiness < 30) return 'sad';
  if (stats.happiness < 50 && stats.energy > 50) return 'bored';
  if (stats.happiness > 80 && stats.health > 80) return 'happy';
  
  return null;
}

export function getStateTransitions(oldPet: Pet, newPet: Pet): string[] {
  const transitions: string[] = [];
  
  // State changes
  if (oldPet.state !== newPet.state) {
    if (newPet.state === 'sleeping') transitions.push('went_to_sleep');
    if (oldPet.state === 'sleeping' && newPet.state !== 'sleeping') transitions.push('woke_up');
    if (newPet.state === 'sick') transitions.push('got_sick');
    if (oldPet.state === 'sick' && newPet.state !== 'sick') transitions.push('got_better');
  }
  
  // Stat thresholds crossed
  if (oldPet.stats.energy >= 30 && newPet.stats.energy < 30) transitions.push('got_tired');
  if (oldPet.stats.hunger <= 70 && newPet.stats.hunger > 70) transitions.push('got_hungry');
  if (oldPet.stats.cleanliness >= 40 && newPet.stats.cleanliness < 40) transitions.push('got_dirty');
  if (oldPet.stats.happiness >= 30 && newPet.stats.happiness < 30) transitions.push('got_sad');
  if (oldPet.stats.health >= 30 && newPet.stats.health < 30) transitions.push('got_sick');
  
  return transitions;
}