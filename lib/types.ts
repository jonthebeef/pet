export interface Pet {
  id: string;
  name: string;
  owner: string;
  ownerAge: number;
  birthDate: Date;
  deathDate?: Date;
  type: PetType;
  stats: PetStats;
  state: PetState;
  lastInteraction: Date;
  age: number; // in hours
  lifeExpectancy: number; // in hours
}

export type PetType = 'dragon' | 'unicorn' | 'robot' | 'alien' | 'dino';

export interface PetStats {
  happiness: number; // 0-100
  health: number; // 0-100
  hunger: number; // 0-100 (100 = very hungry)
  energy: number; // 0-100 (0 = tired)
  cleanliness: number; // 0-100
}

export type PetState = 'happy' | 'sad' | 'sleeping' | 'eating' | 'playing' | 'sick' | 'dead';

export type InteractionType = 'feed' | 'treat' | 'play' | 'sleep' | 'clean' | 'medicine';

export interface Player {
  name: string;
  age: number;
  pets: Pet[];
}

export interface ChatMessage {
  id: string;
  sender: 'pet' | 'user';
  message: string;
  timestamp: Date;
}