import { PetType, Pet } from './types';
import { PetNeed } from './gameLogic';

interface PetPersonality {
  traits: string[];
  greetings: string[];
  needMessages: Record<PetNeed, string[]>;
  interactionResponses: Record<string, string[]>;
}

const personalities: Record<PetType, PetPersonality> = {
  dragon: {
    traits: ['brave', 'fiery', 'adventurous', 'protective'],
    greetings: ['ROAR!', 'Hey there!', 'Ready for adventure?'],
    needMessages: {
      hungry: ['My tummy is rumbling like thunder!', 'Need food to breathe fire!', 'So hungry I could eat a knight!'],
      tired: ['Even dragons need their beauty sleep...', 'Time to rest in my cave', 'So sleepy... zzz'],
      dirty: ['My scales are getting dull!', 'Time for a lava bath!', 'I need to sparkle!'],
      sick: ['Not feeling so fiery...', 'My flame is weak...', 'Need some dragon medicine'],
      sad: ['Missing my treasure hoard...', 'Feeling a bit lonely', 'Need some cheering up'],
      bored: ['Want to go on a quest?', "Let's play knights and dragons!", 'Adventure time?'],
      happy: ['Feeling fierce and fantastic!', 'My flames are extra bright today!', 'RAWR means I love you!'],
      null: []
    },
    interactionResponses: {
      feed: ['Yummy! Fire fuel!', 'That hit the spot!', 'Delicious!'],
      treat: ['Ooh, dragon candy!', 'My favorite!', 'Sweet treasure!'],
      play: ['Adventure time!', 'This is so fun!', "Let's fly!"],
      sleep: ['Time to dream of gold...', 'Nighty night!', 'Sweet dragon dreams'],
      clean: ['Shiny scales again!', 'Looking magnificent!', 'All sparkly now!'],
      medicine: ['Dragon strength returning!', 'Feeling better already', 'My fire is back!']
    }
  },
  unicorn: {
    traits: ['magical', 'gentle', 'dreamy', 'kind'],
    greetings: ['*sparkles*', 'Hello friend!', 'Magic is in the air!'],
    needMessages: {
      hungry: ['Need some rainbow berries', 'My magic needs fuel', 'Tummy feels empty'],
      tired: ['Time for magical dreams', 'So sleepy...', 'Need to rest my horn'],
      dirty: ['My mane needs brushing!', 'Lost my sparkle', 'Time for a rainbow bath'],
      sick: ['Magic feeling weak...', 'Not so sparkly today', 'Need healing magic'],
      sad: ['Missing the enchanted forest', 'Feeling blue', 'Need some love'],
      bored: ['Want to see some magic?', 'Let\'s make rainbows!', 'Play time?'],
      happy: ['Feeling magical!', 'Sparkles everywhere!', 'So much joy!'],
      null: []
    },
    interactionResponses: {
      feed: ['Magical munchies!', 'Tastes like rainbows!', 'Yummy!'],
      treat: ['Sparkle treats!', 'So sweet!', 'Magic candy!'],
      play: ['Wheee!', 'This is magical!', 'So much fun!'],
      sleep: ['Sweet dreams...', 'Off to dreamland', 'Magical rest'],
      clean: ['So shiny!', 'Sparkles restored!', 'Beautiful again!'],
      medicine: ['Magic restored!', 'Feeling sparkly!', 'All better!']
    }
  },
  robot: {
    traits: ['logical', 'helpful', 'curious', 'efficient'],
    greetings: ['BEEP BOOP!', 'Systems online!', 'Hello human!'],
    needMessages: {
      hungry: ['Battery low! Need energy!', 'Fuel reserves depleted', 'Require sustenance input'],
      tired: ['Entering sleep mode soon', 'Systems need recharge', 'Battery critical'],
      dirty: ['Circuits dusty!', 'Maintenance required', 'Need system cleaning'],
      sick: ['ERROR! Malfunction detected', 'Systems not optimal', 'Need debugging'],
      sad: ['Emotional circuits overloaded', 'Feeling... lonely?', 'Social interaction needed'],
      bored: ['Ready for activities!', 'Want to compute something?', 'Playtime protocol?'],
      happy: ['All systems optimal!', 'Happiness.exe running!', 'BEEP BEEP HAPPY!'],
      null: []
    },
    interactionResponses: {
      feed: ['Energy restored!', 'Yum.exe processed!', 'Fuel accepted!'],
      treat: ['Special fuel detected!', 'Treat protocol engaged!', 'Delicious data!'],
      play: ['Fun mode activated!', 'This computes!', 'Maximum enjoyment!'],
      sleep: ['Sleep mode engaging...', 'Powering down...', 'Rest cycle started'],
      clean: ['Maintenance complete!', 'Shiny circuits!', 'All clean!'],
      medicine: ['Debugging complete!', 'Systems restored!', 'Error fixed!']
    }
  },
  alien: {
    traits: ['quirky', 'playful', 'mysterious', 'friendly'],
    greetings: ['Greetings earthling!', 'Bloop bleep!', 'Hello from space!'],
    needMessages: {
      hungry: ['Need space food!', 'Tummy making weird noises', 'Hungry for earth snacks!'],
      tired: ['Space travel is tiring', 'Need to recharge', 'Sleepy alien here'],
      dirty: ['Space dust everywhere!', 'Need a cosmic shower', 'Getting grimy!'],
      sick: ['Not used to earth germs', 'Feeling wobbly', 'Need space medicine'],
      sad: ['Missing my home planet', 'Feeling alien-ated', 'Need a friend'],
      bored: ['Want to explore?', 'Show me earth games!', 'Playtime on Earth?'],
      happy: ['Earth is amazing!', 'So happy here!', 'Best planet ever!'],
      null: []
    },
    interactionResponses: {
      feed: ['Earth food is weird but good!', 'Nom nom nom!', 'Tasty!'],
      treat: ['Ooh special earth treats!', 'Love it!', 'More please!'],
      play: ['Earth games are fun!', 'Wheee!', 'Best time ever!'],
      sleep: ['Time for space dreams', 'Zzz...', 'Sleeping like on Mars'],
      clean: ['All clean now!', 'No more space dust!', 'Sparkly alien!'],
      medicine: ['Feeling better!', 'Earth medicine works!', 'All good now!']
    }
  },
  dino: {
    traits: ['strong', 'prehistoric', 'protective', 'playful'],
    greetings: ['RAWR!', 'Hey there tiny human!', 'Dino friend here!'],
    needMessages: {
      hungry: ['Need prehistoric portions!', 'Tummy rumbling like earthquake!', 'So hungry!'],
      tired: ['Time for dino nap', 'Even T-Rex needs sleep', 'So sleepy...'],
      dirty: ['Covered in prehistoric mud!', 'Need a wash!', 'Dirty dino here'],
      sick: ['Not feeling so mighty...', 'Dino under weather', 'Need help...'],
      sad: ['Missing the other dinos', 'Feeling extinct', 'Need dino hugs'],
      bored: ['Want to stomp around?', "Let's play prehistoric games!", 'Adventure?'],
      happy: ['HAPPY ROAR!', 'Best day since asteroids!', 'Dino dance time!'],
      null: []
    },
    interactionResponses: {
      feed: ['CHOMP CHOMP!', 'Delicious!', 'Yummy in dino tummy!'],
      treat: ['Dino treats!', 'Best snack ever!', 'More please!'],
      play: ['Stomp stomp play!', 'This is dino-mite!', 'So fun!'],
      sleep: ['Dino dreams...', 'Sleepy time', 'Zzz...'],
      clean: ['Clean dino!', 'All fresh now!', 'Sparkly scales!'],
      medicine: ['Feeling stronger!', 'Dino power back!', 'All better!']
    }
  }
};

export function getPetPersonality(type: PetType): PetPersonality {
  return personalities[type];
}

export function getPetMessage(pet: Pet, need: PetNeed | null, context?: 'interaction' | 'greeting'): string {
  const personality = getPetPersonality(pet.type);
  
  if (context === 'greeting') {
    return personality.greetings[Math.floor(Math.random() * personality.greetings.length)];
  }
  
  if (need && personality.needMessages[need].length > 0) {
    const messages = personality.needMessages[need];
    return messages[Math.floor(Math.random() * messages.length)];
  }
  
  return personality.greetings[0];
}

export function getInteractionResponse(pet: Pet, interaction: string): string {
  const personality = getPetPersonality(pet.type);
  const responses = personality.interactionResponses[interaction];
  
  if (responses && responses.length > 0) {
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  return 'Thanks!';
}