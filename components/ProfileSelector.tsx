'use client';

import { useState } from 'react';
import { PetType } from '@/lib/types';

interface ProfileSelectorProps {
  onSelectProfile: (name: string, age: number, petName: string, petType: PetType) => void;
}

export default function ProfileSelector({ onSelectProfile }: ProfileSelectorProps) {
  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState('');
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState<PetType>('dragon');
  const [showPetSelection, setShowPetSelection] = useState(false);
  
  const petTypes: { value: PetType; label: string; emoji: string }[] = [
    { value: 'dragon', label: 'Dragon', emoji: '🐉' },
    { value: 'unicorn', label: 'Unicorn', emoji: '🦄' },
    { value: 'robot', label: 'Robot', emoji: '🤖' },
    { value: 'alien', label: 'Alien', emoji: '👽' },
    { value: 'dino', label: 'Dinosaur', emoji: '🦕' },
  ];
  
  const handleContinue = () => {
    if (userName && userAge && parseInt(userAge) > 0) {
      setShowPetSelection(true);
    }
  };
  
  const handleStart = () => {
    if (userName && userAge && petName) {
      onSelectProfile(userName, parseInt(userAge), petName, petType);
    }
  };
  
  const getAgeEmoji = () => {
    const age = parseInt(userAge);
    if (age < 6) return '👶';
    if (age < 10) return '🧒';
    if (age < 13) return '👦';
    if (age < 18) return '🧑';
    return '🧑‍💼';
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-pixelpet-pink to-pixelpet-purple bg-clip-text text-transparent">
          Welcome to PixelPet! 🎮
        </h1>
        
        {!showPetSelection ? (
          <div className="space-y-6">
            <h2 className="text-2xl text-center mb-6 text-gray-700">Tell us about yourself!</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-pixelpet-purple focus:outline-none text-lg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Age
              </label>
              <div className="flex gap-3 items-center">
                <input
                  type="number"
                  value={userAge}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || (parseInt(value) > 0 && parseInt(value) <= 99)) {
                      setUserAge(value);
                    }
                  }}
                  placeholder="Enter your age"
                  min="1"
                  max="99"
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-pixelpet-purple focus:outline-none text-lg"
                />
                {userAge && (
                  <span className="text-3xl">{getAgeEmoji()}</span>
                )}
              </div>
            </div>
            
            <button
              onClick={handleContinue}
              disabled={!userName || !userAge}
              className="w-full bg-gradient-to-r from-pixelpet-pink to-pixelpet-purple text-white font-bold py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-105 active:scale-95 shadow-lg"
            >
              Continue 🎯
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <button
              onClick={() => setShowPetSelection(false)}
              className="text-gray-500 hover:text-gray-700 mb-4"
            >
              ← Back
            </button>
            
            <div className="text-center">
              <h2 className="text-2xl mb-2">
                Hi {userName}! {getAgeEmoji()}
              </h2>
              <p className="text-gray-600">Let's create your digital pet!</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pet Name
              </label>
              <input
                type="text"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                placeholder="Give your pet a name"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-pixelpet-purple focus:outline-none text-lg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose Your Pet Type
              </label>
              <div className="grid grid-cols-3 gap-3">
                {petTypes.map(({ value, label, emoji }) => (
                  <button
                    key={value}
                    onClick={() => setPetType(value)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      petType === value
                        ? 'border-pixelpet-purple bg-purple-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="text-3xl mb-1">{emoji}</div>
                    <div className="text-sm">{label}</div>
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={handleStart}
              disabled={!petName}
              className="w-full bg-gradient-to-r from-pixelpet-pink to-pixelpet-purple text-white font-bold py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-105 active:scale-95 shadow-lg"
            >
              Start Playing! 🎮
            </button>
          </div>
        )}
      </div>
    </div>
  );
}