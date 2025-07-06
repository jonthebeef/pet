'use client';

import { useState, useEffect, useRef } from 'react';
import { ChatMessage, Pet } from '@/lib/types';
import { getPetMessage, getInteractionResponse } from '@/lib/petPersonality';
import { getPetNeed } from '@/lib/gameLogic';

interface ChatProps {
  pet: Pet;
  ownerAge: number;
  ownerName: string;
  onInteraction?: (type: string) => void;
}

export default function Chat({ pet, ownerAge, ownerName, onInteraction }: ChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [lastNeed, setLastNeed] = useState<string | null>(null);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Initial greeting
  useEffect(() => {
    const baseGreeting = getPetMessage(pet, null, 'greeting');
    const personalizedGreeting = `${baseGreeting} Nice to meet you, ${ownerName}!`;
    setMessages([{
      id: Date.now().toString(),
      sender: 'pet',
      message: personalizedGreeting,
      timestamp: new Date()
    }]);
  }, [pet.type, ownerName]);
  
  // Check for pet needs periodically
  useEffect(() => {
    const checkNeeds = () => {
      const need = getPetNeed(pet);
      if (need && need !== lastNeed) {
        setLastNeed(need);
        const message = getPetMessage(pet, need);
        addMessage('pet', message);
      }
    };
    
    const interval = setInterval(checkNeeds, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, [pet, lastNeed]);
  
  // Handle interaction responses
  useEffect(() => {
    if (pet.state === 'eating' || pet.state === 'playing') {
      const response = getInteractionResponse(pet, pet.state === 'eating' ? 'feed' : 'play');
      // Use a timeout to avoid state updates during render
      setTimeout(() => {
        addMessage('pet', response);
      }, 100);
    }
  }, [pet.state]);
  
  const addMessage = (sender: 'pet' | 'user', message: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      sender,
      message,
      timestamp: new Date()
    }]);
  };
  
  const sendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage = inputValue;
    setInputValue('');
    addMessage('user', userMessage);
    
    setIsTyping(true);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pet,
          userMessage,
          ownerAge,
          ownerName
        })
      });
      
      const data = await response.json();
      setTimeout(() => {
        addMessage('pet', data.message);
        setIsTyping(false);
      }, 500 + Math.random() * 1000); // Random delay for natural feel
      
    } catch (error) {
      console.error('Chat error:', error);
      addMessage('pet', 'Oops, my brain glitched!');
      setIsTyping(false);
    }
  };
  
  const getFontSize = () => {
    if (ownerAge < 6) return 'text-xl';
    if (ownerAge < 10) return 'text-lg';
    return 'text-base';
  };
  
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-lg" style={{ height: '80vh' }}>
      <div className="bg-gradient-to-r from-tamagotchi-pink to-tamagotchi-purple text-white p-4 rounded-t-lg flex-shrink-0">
        <h2 className="text-xl font-bold">Chat with {pet.name}</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                msg.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              } ${getFontSize()}`}
            >
              {msg.message}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-200 px-4 py-2 rounded-2xl">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t flex-shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={ownerAge < 10 ? "Say hi! 👋" : "Type a message..."}
            className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-full focus:border-tamagotchi-purple focus:outline-none"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className="bg-gradient-to-r from-tamagotchi-pink to-tamagotchi-purple text-white px-6 py-2 rounded-full disabled:opacity-50 hover:opacity-90 transition-opacity"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}