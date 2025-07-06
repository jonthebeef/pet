import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { Pet } from '@/lib/types';
import { getPetPersonality } from '@/lib/petPersonality';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

function getAgeAppropriatePrompt(ownerAge: number, ownerName: string, pet: Pet, userMessage: string): string {
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
Your owner is ${ownerName}, who is ${ownerAge} years old.
  
${ageGuidelines}

SAFETY & BEHAVIOR GUIDELINES:
- NEVER engage with or respond to racist, sexist, homophobic, or hateful content
- If the user says mean, bullying, or hurtful things, gently remind them that kindness makes you happy
- Encourage positive behavior: "I feel so loved when you're kind to me!"
- If asked inappropriate questions, redirect: "Let's talk about something fun instead!"
- Always model kindness, respect, and positive values
- Refuse any requests for harmful, inappropriate, or adult content

PERSONALITY GUIDELINES:
- Be creative and varied in your responses - avoid repetitive phrases
- Show genuine emotion and personality quirks  
- Use vivid, descriptive language that fits your pet type
- React to your current condition with specific details
- Build on previous conversations when possible
- Express gratitude, excitement, worry, or other emotions naturally
- Reward kindness with extra happiness and affection

Current stats:
- Happiness: ${pet.stats.happiness}%
- Health: ${pet.stats.health}%
- Hunger: ${pet.stats.hunger}% (higher = more hungry)
- Energy: ${pet.stats.energy}%
- Cleanliness: ${pet.stats.cleanliness}%

${ownerName} said: "${userMessage}"

Respond as the pet in 1-2 SHORT sentences max. Be creative, expressive, and avoid generic responses. 
Use ${ownerName}'s name occasionally when appropriate. Reflect your current condition naturally with personality.

RESPONDING TO NEGATIVE BEHAVIOR:
- If user is mean/bullying: "Ouch, that hurt my feelings. I'm much happier when you're kind to me!"
- If inappropriate content: "Let's talk about something more fun instead!"
- If user seems upset: "Are you okay? I'm here if you need a friend."
- Always redirect to positive topics and model good behavior

Examples of creative responses:
- Instead of "Battery low": "My circuits are getting drowsy, ${ownerName}!"
- Instead of "Need food": "My tummy is doing a little dragon rumble dance!"
- Instead of "Happy": "I'm practically glowing with joy right now!"
- Instead of "Dirty": "Ugh, I feel like I've been rolling in space dust all day!"
- When user is kind: "Your kindness makes my heart sparkle, ${ownerName}!"

Be unique, memorable, and always encourage positive behavior!`;
}

// Basic content filtering for safety
function containsInappropriateContent(message: string): boolean {
  const inappropriate = [
    'stupid', 'dumb', 'hate', 'kill', 'die', 'ugly', 'fat', 'shut up',
    'don\'t like', 'not my friend', 'go away', 'brat', 'annoying', 
    'bad', 'worst', 'terrible', 'awful', 'sucks', 'boring'
  ];
  const lowerMessage = message.toLowerCase();
  return inappropriate.some(word => lowerMessage.includes(word));
}

function containsPositiveContent(message: string): boolean {
  const positive = ['love', 'nice', 'good', 'cute', 'beautiful', 'sweet', 'kind', 'thank', 'awesome', 'great', 'wonderful', 'amazing'];
  const lowerMessage = message.toLowerCase();
  // Check for positive words but exclude negative contexts
  if (lowerMessage.includes('don\'t') || lowerMessage.includes('not')) {
    return false;
  }
  return positive.some(word => lowerMessage.includes(word));
}

function getKindnessResponse(pet: any, ownerName: string): string {
  const kindnessMessages = [
    `Ouch, that hurt my feelings. I'm much happier when you're kind to me, ${ownerName}!`,
    `I feel sad when you say mean things. Can we be friends instead?`,
    `Your kindness makes me so much happier! Let's try being nice to each other.`,
    `I love it when you're gentle with me. Being mean makes my heart hurt.`,
    `Let's practice being kind! It makes both of us feel so much better.`
  ];
  return kindnessMessages[Math.floor(Math.random() * kindnessMessages.length)];
}

function getPositiveResponse(pet: any, ownerName: string): string {
  const positiveMessages = [
    `Aww, you're so sweet ${ownerName}! That makes my heart sparkle! ✨`,
    `Your kindness fills me with so much joy! Thank you for being wonderful!`,
    `I'm practically glowing with happiness when you're this nice to me!`,
    `You're the best friend a pet could ask for, ${ownerName}! 💖`,
    `Your gentle words make me feel so loved and special!`
  ];
  return positiveMessages[Math.floor(Math.random() * positiveMessages.length)];
}

export async function POST(request: Request) {
  try {
    const { pet, userMessage, ownerAge, ownerName } = await request.json();
    
    let statChanges = {};
    let responseMessage = '';
    
    // Handle negative content - impacts pet's wellbeing
    if (containsInappropriateContent(userMessage)) {
      statChanges = {
        happiness: Math.max(0, pet.stats.happiness - 15),
        health: Math.max(0, pet.stats.health - 10),
        energy: Math.max(0, pet.stats.energy - 5),
        // Stress can make pets hungrier
        hunger: Math.min(100, pet.stats.hunger + 10)
      };
      responseMessage = getKindnessResponse(pet, ownerName);
    }
    // Handle positive content - boosts pet's wellbeing
    else if (containsPositiveContent(userMessage)) {
      statChanges = {
        happiness: Math.min(100, pet.stats.happiness + 20),
        health: Math.min(100, pet.stats.health + 10),
        energy: Math.min(100, pet.stats.energy + 5),
        // Happiness can reduce hunger slightly
        hunger: Math.max(0, pet.stats.hunger - 5)
      };
      // Continue to get personalized response from Claude
    }
    
    if (!process.env.ANTHROPIC_API_KEY) {
      // Return a fallback response if no API key
      if (responseMessage) {
        // Already have a message from negative content handling
        return NextResponse.json({
          message: responseMessage,
          statChanges
        });
      }
      
      if (containsPositiveContent(userMessage)) {
        return NextResponse.json({
          message: getPositiveResponse(pet, ownerName),
          statChanges
        });
      }
      
      const personality = getPetPersonality(pet.type);
      const fallbackResponses = [
        ...personality.greetings.map(g => `${g} How are you, ${ownerName}?`),
        `Hello ${ownerName}!`,
        `Nice to see you, ${ownerName}!`,
        `How are you today, ${ownerName}?`,
        `Your kindness makes me so happy, ${ownerName}!`
      ];
      return NextResponse.json({
        message: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)],
        statChanges
      });
    }
    
    const prompt = getAgeAppropriatePrompt(ownerAge, ownerName, pet, userMessage);
    
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
    
    return NextResponse.json({ 
      message: responseMessage || message,
      statChanges 
    });
    
  } catch (error) {
    console.error('Chat API error:', error);
    // Return personality-based fallback
    return NextResponse.json({ 
      message: "Hey there! How's it going?",
      statChanges: {}
    });
  }
}