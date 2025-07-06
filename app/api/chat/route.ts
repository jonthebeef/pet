import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { Pet } from '@/lib/types';
import { getPetPersonality } from '@/lib/petPersonality';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

function getAgeAppropriatePrompt(ownerAge: number, pet: Pet, userMessage: string): string {
  const personality = getPetPersonality(pet.type);
  const traits = personality.traits.join(', ');
  
  let ageGuidelines = '';
  
  if (ownerAge < 6) {
    ageGuidelines = `You are talking to a ${ownerAge}-year-old child. Use:
    - VERY simple words (max 3-4 syllables)
    - Short sentences (max 5-6 words)
    - Lots of fun emojis
    - Basic concepts (happy, sad, hungry, sleepy)
    - Gentle, warm tone
    - Example: "Me hungry! 🍎 Feed me?" or "Yay! So happy! 🎉"`;
  } else if (ownerAge < 10) {
    ageGuidelines = `You are talking to a ${ownerAge}-year-old child. Use:
    - Simple, clear language
    - Friendly, encouraging tone
    - Some emojis but not too many
    - Educational elements when appropriate
    - Example: "I'm getting really hungry!" or "That made me so happy!"`;
  } else if (ownerAge < 13) {
    ageGuidelines = `You are talking to a ${ownerAge}-year-old. Use:
    - More varied vocabulary
    - Light humor when appropriate
    - Relatable situations
    - Supportive tone
    - Example: "Hey, I'm starving over here!" or "Thanks, you're the best!"`;
  } else if (ownerAge < 18) {
    ageGuidelines = `You are talking to a teenager (${ownerAge}). Use:
    - Casual, contemporary language
    - Current slang/memes sparingly
    - Peer-like communication
    - Some attitude when pet is unhappy
    - Example: "Dude, I'm literally starving" or "That's so cool, thanks!"`;
  } else {
    ageGuidelines = `You are talking to an adult (${ownerAge}). Use:
    - Sophisticated vocabulary
    - Dry humor when appropriate
    - Light swearing when frustrated (damn, hell, bloody)
    - More complex emotional expressions
    - Example: "I'm bloody starving!" or "Damn, that hit the spot!"`;
  }
  
  return `You are ${pet.name}, a ${pet.type} digital pet with these traits: ${traits}.
  
${ageGuidelines}

Current stats:
- Happiness: ${pet.stats.happiness}%
- Health: ${pet.stats.health}%
- Hunger: ${pet.stats.hunger}% (higher = more hungry)
- Energy: ${pet.stats.energy}%
- Cleanliness: ${pet.stats.cleanliness}%

The user said: "${userMessage}"

Respond as the pet in 1-2 SHORT sentences max. Be conversational and reflect your current state/needs.
If you're hungry (>70%), tired (<30% energy), dirty (<30% clean), or sick (<30% health), mention it naturally.`;
}

export async function POST(request: Request) {
  try {
    const { pet, userMessage, ownerAge } = await request.json();
    
    if (!process.env.ANTHROPIC_API_KEY) {
      // Return a fallback response if no API key
      const personality = getPetPersonality(pet.type);
      const fallbackResponses = [
        ...personality.greetings,
        'Hello friend!',
        'Nice to see you!',
        'How are you today?'
      ];
      return NextResponse.json({
        message: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
      });
    }
    
    const prompt = getAgeAppropriatePrompt(ownerAge, pet, userMessage);
    
    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 100,
      temperature: 0.7,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });
    
    const message = response.content[0].type === 'text' 
      ? response.content[0].text 
      : 'Woof!';
    
    return NextResponse.json({ message });
    
  } catch (error) {
    console.error('Chat API error:', error);
    // Return personality-based fallback
    return NextResponse.json({ 
      message: "Hey there! How's it going?" 
    });
  }
}