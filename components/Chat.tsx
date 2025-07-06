'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, Pet } from '@/lib/types';
import { getPetMessage, getInteractionResponse, getTransitionMessage } from '@/lib/petPersonality';
import { getPetNeed, getStateTransitions } from '@/lib/gameLogic';

interface ChatProps {
  pet: Pet;
  ownerAge: number;
  ownerName: string;
  onInteraction?: (type: string) => void;
  onPetUpdate?: (pet: Pet) => void;
}

export default function Chat({ pet, ownerAge, ownerName, onInteraction, onPetUpdate }: ChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [lastNeed, setLastNeed] = useState<string | null>(null);
  const [prevPet, setPrevPet] = useState<Pet>(pet);
  const [recentTransitions, setRecentTransitions] = useState<Set<string>>(new Set());
  const [lastNeedMessageTime, setLastNeedMessageTime] = useState<number>(0);
  const [userMessageCount, setUserMessageCount] = useState(0);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle tab key to focus input field
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // Initial greeting and focus
  useEffect(() => {
    const baseGreeting = getPetMessage(pet, null, 'greeting');
    const personalizedGreeting = `${baseGreeting} Nice to meet you, ${ownerName}!`;
    setMessages([{
      id: Date.now().toString(),
      sender: 'pet',
      message: personalizedGreeting,
      timestamp: new Date()
    }]);
    
    // Auto-focus input on load
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, [pet.type, ownerName]);
  
  // Check for state transitions and needs
  useEffect(() => {
    // Check for state transitions
    const transitions = getStateTransitions(prevPet, pet);
    transitions.forEach(transition => {
      // Prevent duplicate transition messages within 10 seconds
      const transitionKey = `${transition}-${Date.now()}`;
      const recentKey = Array.from(recentTransitions).find(key => key.startsWith(transition + '-'));
      
      if (recentKey) {
        const lastTime = parseInt(recentKey.split('-')[1]);
        if (Date.now() - lastTime < 30000) { // 30 second cooldown to reduce spam
          return; // Skip this transition message
        }
      }
      
      const message = getTransitionMessage(pet, transition);
      if (message) {
        // Add to recent transitions
        setRecentTransitions(prev => {
          const newSet = new Set(prev);
          // Remove old entries for this transition type
          Array.from(newSet).forEach(key => {
            if (key.startsWith(transition + '-')) {
              newSet.delete(key);
            }
          });
          newSet.add(transitionKey);
          return newSet;
        });
        
        setTimeout(() => {
          addMessage('pet', message);
        }, Math.random() * 1000 + 500); // Random delay between 0.5-1.5s
      }
    });
    
    // Check for ongoing needs (with cooldown to reduce spam)
    const need = getPetNeed(pet);
    const now = Date.now();
    const timeSinceLastNeed = now - lastNeedMessageTime;
    
    // Only send need messages if it's a new need and enough time has passed (30 seconds)
    if (need && need !== lastNeed && timeSinceLastNeed > 30000) {
      setLastNeed(need);
      setLastNeedMessageTime(now);
      const message = getPetMessage(pet, need);
      setTimeout(() => {
        addMessage('pet', message);
      }, 2000); // Delay need messages so they don't overlap with transitions
    }
    
    setPrevPet(pet);
  }, [pet, prevPet, lastNeed, recentTransitions, lastNeedMessageTime]);
  
  // Handle interaction responses - DISABLED to reduce chat spam
  // useEffect(() => {
  //   if (pet.state === 'eating' || pet.state === 'playing') {
  //     const response = getInteractionResponse(pet, pet.state === 'eating' ? 'feed' : 'play');
  //     // Use a timeout to avoid state updates during render
  //     setTimeout(() => {
  //       addMessage('pet', response);
  //     }, 100);
  //   }
  // }, [pet.state]);
  
  const addMessage = (sender: 'pet' | 'user', message: string) => {
    // Remember if input was focused before adding message
    const wasInputFocused = document.activeElement === inputRef.current;
    
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      sender,
      message,
      timestamp: new Date()
    }]);
    
    // Restore focus if it was on input
    if (wasInputFocused && sender === 'pet') {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  };
  
  const sendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage = inputValue;
    setInputValue('');
    addMessage('user', userMessage);
    setUserMessageCount(prev => prev + 1);
    
    // Keep focus on input after sending
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    
    setIsTyping(true);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pet,
          userMessage,
          ownerAge,
          ownerName,
          messageCount: userMessageCount + 1
        })
      });
      
      const data = await response.json();
      setTimeout(() => {
        addMessage('pet', data.message);
        setIsTyping(false);
        
        // Apply stat changes if they exist
        if (data.statChanges && onPetUpdate) {
          const updatedPet = {
            ...pet,
            stats: {
              ...pet.stats,
              ...data.statChanges
            },
            lastInteraction: new Date()
          };
          onPetUpdate(updatedPet);
          
          // Show visual feedback for stat changes
          // Check if happiness, health, or energy increased (positive changes)
          const happinessUp = data.statChanges.happiness && data.statChanges.happiness > pet.stats.happiness;
          const healthUp = data.statChanges.health && data.statChanges.health > pet.stats.health;
          const energyUp = data.statChanges.energy && data.statChanges.energy > pet.stats.energy;
          
          // Check if happiness, health, or energy decreased (negative changes)
          const happinessDown = data.statChanges.happiness && data.statChanges.happiness < pet.stats.happiness;
          const healthDown = data.statChanges.health && data.statChanges.health < pet.stats.health;
          const energyDown = data.statChanges.energy && data.statChanges.energy < pet.stats.energy;
          
          if (happinessUp || healthUp || energyUp) {
            setTimeout(() => {
              addMessage('pet', '✨ *feels happier and healthier* ✨');
            }, 1500);
          } else if (happinessDown || healthDown || energyDown) {
            setTimeout(() => {
              addMessage('pet', '💔 *feels hurt and stressed* 💔');
            }, 1500);
          }
        }
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

  // Simple markdown renderer for basic formatting
  const renderMarkdown = (text: string) => {
    // Process markdown formatting in order: bold first, then italic
    let processedText = text;
    const elements: (string | React.JSX.Element)[] = [];
    let keyCounter = 0;
    
    // First pass: handle **bold** text
    const boldRegex = /\*\*(.*?)\*\*/g;
    const boldMatches: Array<{text: string, start: number, end: number}> = [];
    let boldMatch: RegExpExecArray | null;
    
    while ((boldMatch = boldRegex.exec(text)) !== null) {
      boldMatches.push({
        text: boldMatch[1],
        start: boldMatch.index,
        end: boldMatch.index + boldMatch[0].length
      });
    }
    
    // Second pass: handle *italic* text (but not inside bold)
    const italicRegex = /\*([^*]+?)\*/g;
    const italicMatches: Array<{text: string, start: number, end: number}> = [];
    let italicMatch: RegExpExecArray | null;
    
    while ((italicMatch = italicRegex.exec(text)) !== null) {
      // Check if this italic is inside a bold section
      const insideBold = boldMatches.some(bold => 
        italicMatch!.index >= bold.start && italicMatch!.index + italicMatch![0].length <= bold.end
      );
      
      if (!insideBold) {
        italicMatches.push({
          text: italicMatch[1],
          start: italicMatch.index,
          end: italicMatch.index + italicMatch[0].length
        });
      }
    }
    
    // Combine and sort all matches
    const allMatches = [
      ...boldMatches.map(m => ({...m, type: 'bold' as const})),
      ...italicMatches.map(m => ({...m, type: 'italic' as const}))
    ].sort((a, b) => a.start - b.start);
    
    // Build the final result
    let currentIndex = 0;
    
    for (const match of allMatches) {
      // Add text before the match
      if (match.start > currentIndex) {
        elements.push(text.slice(currentIndex, match.start));
      }
      
      // Add formatted text
      if (match.type === 'bold') {
        elements.push(<strong key={`bold-${keyCounter++}`}>{match.text}</strong>);
      } else {
        elements.push(<em key={`italic-${keyCounter++}`}>{match.text}</em>);
      }
      
      currentIndex = match.end;
    }
    
    // Add remaining text
    if (currentIndex < text.length) {
      elements.push(text.slice(currentIndex));
    }
    
    // If no markdown found, return original text
    if (elements.length === 0) {
      return text;
    }
    
    return elements;
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
              {renderMarkdown(msg.message)}
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
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={ownerAge < 10 ? "Say hi! 👋" : "Type a message..."}
            className="flex-1 px-4 py-4 border-2 border-gray-300 rounded-full focus:border-tamagotchi-purple focus:outline-none text-lg"
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