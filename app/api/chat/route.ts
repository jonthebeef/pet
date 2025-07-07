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

IMPORTANT: Analyze the emotional tone of the user's message and respond accordingly:

1. First, determine if the message is:
   - POSITIVE (kind, loving, supportive, encouraging, grateful, excited)
   - NEGATIVE (mean, hurtful, angry, dismissive, cruel, bullying)
   - NEUTRAL (casual conversation, questions, neutral statements)

2. Then respond as the pet in 1-2 SHORT sentences max. Be creative, expressive, and avoid generic responses.

3. CRITICAL: After your response, on a new line, add ONE of these codes:
   - TONE:POSITIVE (if the message was kind/loving/supportive)
   - TONE:NEGATIVE (if the message was mean/hurtful/dismissive)
   - TONE:NEUTRAL (if the message was casual/neutral)

Examples:
- User: "I love you so much!" → Pet response + "TONE:POSITIVE"
- User: "You're annoying and stupid" → Pet response + "TONE:NEGATIVE"  
- User: "What's your favorite color?" → Pet response + "TONE:NEUTRAL"

Be unique, memorable, and always encourage positive behavior!`;
}

// Enhanced content filtering for cost optimization
function analyzeMessageTone(message: string): 'positive' | 'negative' | 'neutral' | 'ambiguous' {
  const lowerMessage = message.toLowerCase();
  
  // Strong negative indicators
  const strongNegative = [
    'hate', 'stupid', 'dumb', 'idiot', 'moron', 'shut up', 'go away',
    'don\'t like', 'not my friend', 'annoying', 'brat', 'ugly', 'fat',
    'kill', 'die', 'worst', 'terrible', 'awful', 'sucks', 'boring',
    'useless', 'worthless', 'pathetic', 'loser', 'freak', 'weird',
    'creepy', 'gross', 'disgusting', 'nasty', 'mean', 'cruel'
  ];
  
  // Strong positive indicators  
  const strongPositive = [
    'love you', 'adore', 'amazing', 'awesome', 'wonderful', 'fantastic',
    'incredible', 'perfect', 'brilliant', 'outstanding', 'excellent',
    'adorable', 'cute', 'sweet', 'kind', 'nice', 'beautiful', 'lovely',
    'thank you', 'grateful', 'appreciate', 'best friend', 'so good',
    'really like', 'care about', 'proud of', 'happy with'
  ];
  
  // Negative patterns (context-aware)
  const negativePatterns = [
    /you\'?re\s+(not|never)\s+\w+/,  // "you're not good"
    /i\s+don\'?t\s+(like|want|care)/,  // "i don't like"
    /why\s+(are\s+you|do\s+you)\s+so\s+\w+/,  // "why are you so annoying"
    /stop\s+(being|doing)/,  // "stop being"
    /you\s+always\s+\w+/,  // "you always mess up"
  ];
  
  // Positive patterns
  const positivePatterns = [
    /you\'?re\s+(so|really|very)\s+\w+/,  // "you're so cute" 
    /i\s+(love|like|enjoy|appreciate)/,  // "i love you"
    /thank\s+you/,  // "thank you"
    /you\'?re\s+(the\s+)?best/,  // "you're the best"
    /good\s+(job|work|pet)/,  // "good job"
  ];
  
  // Check for strong indicators first
  for (const word of strongNegative) {
    if (lowerMessage.includes(word)) return 'negative';
  }
  
  for (const word of strongPositive) {
    if (lowerMessage.includes(word)) return 'positive';
  }
  
  // Check patterns
  for (const pattern of negativePatterns) {
    if (pattern.test(lowerMessage)) return 'negative';
  }
  
  for (const pattern of positivePatterns) {
    if (pattern.test(lowerMessage)) return 'positive';
  }
  
  // Neutral indicators (questions, statements, commands)
  const neutralIndicators = [
    /^(what|when|where|who|why|how)\s+/,  // questions
    /^(can|could|will|would)\s+you/,  // polite requests
    /^(tell|show|explain)\s+me/,  // information requests
    /\?$/,  // ends with question mark
  ];
  
  for (const pattern of neutralIndicators) {
    if (pattern.test(lowerMessage)) return 'neutral';
  }
  
  // If we can't determine clearly, it's ambiguous and needs AI analysis
  return 'ambiguous';
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

function getAgeAppropriateQuestions(ownerAge: number): string[] {
  if (ownerAge < 6) {
    return [
      "How are you feeling today? 🤗",
      "Are you happy or sad right now? 💙",
      "What's your favorite color? 🌈",
      "Do you like to draw pictures? 🎨",
      "What makes you smile? 😊",
      "Do you have a favorite toy? 🧸",
      "What's your favorite snack? 🍪"
    ];
  } else if (ownerAge < 10) {
    return [
      "How are you feeling today? 😊",
      "Is everything okay with you? 💭",
      "What was the best part of your day? ✨",
      "If you could have any superpower, what would it be? 🦸",
      "What's your favorite game to play? 🎮",
      "Do you have a favorite book or story? 📚",
      "What makes you laugh the most? 😄",
      "If you could visit anywhere, where would you go? 🗺️"
    ];
  } else if (ownerAge < 13) {
    return [
      "How are you doing today? 🌟",
      "What's on your mind? 💭",
      "What's something cool you learned recently? 🤔",
      "What kind of music do you like? 🎵",
      "What's your favorite subject in school? 📖",
      "If you could meet anyone, who would it be? ⭐",
      "What's your dream adventure? 🏔️",
      "What hobby makes you happiest? 🎯"
    ];
  } else if (ownerAge < 18) {
    return [
      "How are you really doing? 💫",
      "What's been on your mind lately? 🤔",
      "What's inspiring you lately? 💫",
      "What's a goal you're working toward? 🎯",
      "What's the most interesting thing you've discovered recently? 🔍",
      "If you could change one thing about the world, what would it be? 🌍",
      "What's your favorite way to relax? 🌺",
      "What are you most grateful for today? 🙏"
    ];
  } else {
    return [
      "How are you doing today, really? 🌸",
      "How's your mental space today? 🧘",
      "What's bringing you joy these days? ☀️",
      "What's something you're looking forward to? 🌟",
      "What's a small win you've had recently? 🏆",
      "If you could master any skill instantly, what would it be? 🎨",
      "What's your favorite way to unwind? 🌿",
      "What made you smile today? 😊"
    ];
  }
}

function getPositiveResponse(pet: any, ownerName: string, messageCount?: number, ownerAge?: number): string {
  const positiveMessages = [
    `Aww, you're so sweet ${ownerName}! That makes my heart sparkle! ✨`,
    `Your kindness fills me with so much joy! Thank you for being wonderful!`,
    `I'm practically glowing with happiness when you're this nice to me!`,
    `You're the best friend a pet could ask for, ${ownerName}! 💖`,
    `Your gentle words make me feel so loved and special!`
  ];
  
  // Sometimes ask a question after positive interactions (about 1 in 3 times after 3+ messages)
  if (messageCount && messageCount >= 3 && Math.random() < 0.33 && ownerAge !== undefined) {
    const response = positiveMessages[Math.floor(Math.random() * positiveMessages.length)];
    const questions = getAgeAppropriateQuestions(ownerAge);
    const question = questions[Math.floor(Math.random() * questions.length)];
    return `${response} ${question}`;
  }
  
  return positiveMessages[Math.floor(Math.random() * positiveMessages.length)];
}

function getStatChanges(tone: 'positive' | 'negative', pet: Pet) {
  if (tone === 'positive') {
    return {
      happiness: Math.min(100, pet.stats.happiness + 20),
      health: Math.min(100, pet.stats.health + 15), // Increased from 10 to 15 for more visible effect
      energy: Math.min(100, pet.stats.energy + 5),
      hunger: Math.max(0, pet.stats.hunger - 5)
    };
  } else {
    return {
      happiness: Math.max(0, pet.stats.happiness - 15),
      health: Math.max(0, pet.stats.health - 10),
      energy: Math.max(0, pet.stats.energy - 5),
      hunger: Math.min(100, pet.stats.hunger + 10)
    };
  }
}

export async function POST(request: Request) {
  try {
    const { pet, userMessage, ownerAge, ownerName, messageCount } = await request.json();
    
    // Step 1: Use enhanced local filtering first
    const localToneAnalysis = analyzeMessageTone(userMessage);
    
    // Step 2: Handle clear positive/negative cases locally (saves API calls)
    if (localToneAnalysis === 'positive') {
      const statChanges = getStatChanges('positive', pet);
      return NextResponse.json({
        message: getPositiveResponse(pet, ownerName, messageCount, ownerAge),
        statChanges
      });
    }
    
    if (localToneAnalysis === 'negative') {
      const statChanges = getStatChanges('negative', pet);
      return NextResponse.json({
        message: getKindnessResponse(pet, ownerName),
        statChanges
      });
    }
    
    // Step 3: For neutral messages, get AI response but no stat changes
    if (localToneAnalysis === 'neutral') {
      if (!process.env.ANTHROPIC_API_KEY) {
        const personality = getPetPersonality(pet.type);
        const fallbackResponses = [
          ...personality.greetings.map(g => `${g} How are you, ${ownerName}?`),
          `Hello ${ownerName}!`,
          `Nice to see you, ${ownerName}!`,
          `How are you today, ${ownerName}?`
        ];
        return NextResponse.json({
          message: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)],
          statChanges: {}
        });
      }
      
      // Get AI response for neutral messages but no tone analysis needed
      const fullPrompt = getAgeAppropriatePrompt(ownerAge, ownerName, pet, userMessage);
      const simplePrompt = fullPrompt.substring(0, fullPrompt.indexOf('IMPORTANT:')) + 
                          'Respond as the pet in 1-2 SHORT sentences max. Be creative and expressive.';
      
      const response = await anthropic.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 100,
        temperature: 0.7,
        messages: [{ role: 'user', content: simplePrompt }]
      });
      
      const message = response.content[0].type === 'text' ? response.content[0].text : 'Woof!';
      return NextResponse.json({ message, statChanges: {} });
    }
    
    // Step 4: Only for ambiguous cases, use full AI sentiment analysis (costs money)
    if (localToneAnalysis === 'ambiguous') {
      if (!process.env.ANTHROPIC_API_KEY) {
        const personality = getPetPersonality(pet.type);
        const fallbackResponses = [
          ...personality.greetings.map(g => `${g} How are you, ${ownerName}?`),
          `Hello ${ownerName}!`,
          `Nice to see you, ${ownerName}!`
        ];
        return NextResponse.json({
          message: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)],
          statChanges: {}
        });
      }
      
      console.log('🤖 Using AI sentiment analysis for ambiguous message:', userMessage);
      
      const prompt = getAgeAppropriatePrompt(ownerAge, ownerName, pet, userMessage);
      
      const response = await anthropic.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 150,
        temperature: 0.7,
        messages: [{ role: 'user', content: prompt }]
      });
      
      const fullResponse = response.content[0].type === 'text' ? response.content[0].text : 'Woof!';
      
      // Parse AI response for tone
      let petMessage = fullResponse;
      let statChanges = {};
      
      if (fullResponse.includes('TONE:POSITIVE')) {
        petMessage = fullResponse.replace(/\s*TONE:POSITIVE\s*$/, '').trim();
        statChanges = getStatChanges('positive', pet);
      } else if (fullResponse.includes('TONE:NEGATIVE')) {
        petMessage = fullResponse.replace(/\s*TONE:NEGATIVE\s*$/, '').trim();
        statChanges = getStatChanges('negative', pet);
      } else if (fullResponse.includes('TONE:NEUTRAL')) {
        petMessage = fullResponse.replace(/\s*TONE:NEUTRAL\s*$/, '').trim();
      }
      
      return NextResponse.json({ message: petMessage, statChanges });
    }
    
  } catch (error) {
    console.error('Chat API error:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    return NextResponse.json({ 
      message: "Hey there! How's it going?",
      statChanges: {},
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}