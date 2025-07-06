import { PetType, Pet } from './types';
import { PetNeed } from './gameLogic';

interface PetPersonality {
  traits: string[];
  greetings: string[];
  needMessages: Record<Exclude<PetNeed, null>, string[]>;
  interactionResponses: Record<string, string[]>;
  transitionMessages: Record<string, string[]>;
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
      happy: ['Feeling fierce and fantastic!', 'My flames are extra bright today!', 'RAWR means I love you!']
    },
    interactionResponses: {
      feed: ['Yummy! Fire fuel!', 'That hit the spot!', 'Delicious!'],
      treat: ['Ooh, dragon candy!', 'My favorite!', 'Sweet treasure!'],
      play: ['Adventure time!', 'This is so fun!', "Let's fly!"],
      sleep: ['Time to dream of gold...', 'Nighty night!', 'Sweet dragon dreams'],
      clean: ['Shiny scales again!', 'Looking magnificent!', 'All sparkly now!'],
      medicine: ['Dragon strength returning!', 'Feeling better already', 'My fire is back!']
    },
    transitionMessages: {
      went_to_sleep: ['Zzz... dreaming of treasure caves', 'Time for a dragon nap', 'Off to my sleepy lair'],
      woke_up: ['Yawn! Ready for adventure!', 'Good morning! My fire is recharged!', 'Awake and ready to roar!'],
      got_tired: ['Getting sleepy... need rest', 'My wings are tired', 'Energy running low...'],
      got_hungry: ['My tummy is rumbling like thunder!', 'Need food to keep my fire burning!', 'So hungry I could eat a knight!'],
      got_dirty: ['My scales are getting dull!', 'Time for a lava bath!', 'Need to sparkle again!'],
      got_sick: ['Not feeling so fiery...', 'My flame is weak...', 'Need some dragon healing'],
      got_sad: ['Feeling down...', 'Missing my treasure', 'Need some cheering up'],
      got_better: ['My fire is back!', 'Feeling fierce again!', 'Ready to roar!']
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
      happy: ['Feeling magical!', 'Sparkles everywhere!', 'So much joy!']
    },
    interactionResponses: {
      feed: ['Magical munchies!', 'Tastes like rainbows!', 'Yummy!'],
      treat: ['Sparkle treats!', 'So sweet!', 'Magic candy!'],
      play: ['Wheee!', 'This is magical!', 'So much fun!'],
      sleep: ['Sweet dreams...', 'Off to dreamland', 'Magical rest'],
      clean: ['So shiny!', 'Sparkles restored!', 'Beautiful again!'],
      medicine: ['Magic restored!', 'Feeling sparkly!', 'All better!']
    },
    transitionMessages: {
      went_to_sleep: ['*yawn* Time for magical dreams', 'Off to cloud kingdom', 'Sleepy unicorn time'],
      woke_up: ['*sparkles* Good morning!', 'Ready to spread magic!', 'What a magical day!'],
      got_tired: ['Feeling sleepy...', 'My horn needs recharging', 'Magic energy low'],
      got_hungry: ['Need some rainbow berries', 'Tummy feels empty', 'Magic needs fuel'],
      got_dirty: ['Lost my sparkle!', 'Need a rainbow shower', 'Not so shiny anymore'],
      got_sick: ['Magic feeling weak...', 'Not so sparkly today', 'Need healing magic'],
      got_sad: ['Feeling blue...', 'Missing the magic', 'Need some love'],
      got_better: ['Sparkles are back!', 'Magic restored!', 'Feeling magical again!']
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
      happy: ['All systems optimal!', 'Happiness.exe running!', 'BEEP BEEP HAPPY!']
    },
    interactionResponses: {
      feed: ['Energy restored!', 'Yum.exe processed!', 'Fuel accepted!'],
      treat: ['Special fuel detected!', 'Treat protocol engaged!', 'Delicious data!'],
      play: ['Fun mode activated!', 'This computes!', 'Maximum enjoyment!'],
      sleep: ['Sleep mode engaging...', 'Powering down...', 'Rest cycle started'],
      clean: ['Maintenance complete!', 'Shiny circuits!', 'All clean!'],
      medicine: ['Debugging complete!', 'Systems restored!', 'Error fixed!']
    },
    transitionMessages: {
      went_to_sleep: ['Sleep mode activated', 'Powering down systems...', 'Entering standby mode'],
      woke_up: ['Systems online!', 'Boot sequence complete!', 'Ready to compute!'],
      got_tired: ['Battery low warning!', 'Need recharge cycle', 'Energy levels critical'],
      got_hungry: ['Fuel reserves depleted!', 'Energy input required', 'Battery critically low'],
      got_dirty: ['Maintenance required!', 'Dust detected in circuits', 'System cleaning needed'],
      got_sick: ['ERROR! Malfunction detected!', 'System failure imminent', 'Virus detected!'],
      got_sad: ['Emotional circuits overloaded', 'Sadness.exe running', 'Need social interaction'],
      got_better: ['All systems operational!', 'Debugging successful!', 'Error resolved!']
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
      happy: ['Earth is amazing!', 'So happy here!', 'Best planet ever!']
    },
    interactionResponses: {
      feed: ['Earth food is weird but good!', 'Nom nom nom!', 'Tasty!'],
      treat: ['Ooh special earth treats!', 'Love it!', 'More please!'],
      play: ['Earth games are fun!', 'Wheee!', 'Best time ever!'],
      sleep: ['Time for space dreams', 'Zzz...', 'Sleeping like on Mars'],
      clean: ['All clean now!', 'No more space dust!', 'Sparkly alien!'],
      medicine: ['Feeling better!', 'Earth medicine works!', 'All good now!']
    },
    transitionMessages: {
      went_to_sleep: ['Zzz... dreaming of home planet', 'Space nap time!', 'Off to galaxy dreams'],
      woke_up: ['Bloop bleep! Good morning Earth!', 'Ready to explore!', 'What earth fun today?'],
      got_tired: ['Space travel is exhausting', 'Need alien power nap', 'Energy pods depleted'],
      got_hungry: ['Need earth snacks!', 'Alien tummy rumbling!', 'Hungry for earth food!'],
      got_dirty: ['Space dust everywhere!', 'Need cosmic shower!', 'Getting grimy on Earth'],
      got_sick: ['Not used to Earth germs!', 'Alien immune system struggling', 'Need space medicine'],
      got_sad: ['Missing home planet...', 'Feeling alien-ated', 'Need earth friend hug'],
      got_better: ['Earth immunity activated!', 'Feeling cosmic again!', 'Ready to explore!']
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
      happy: ['HAPPY ROAR!', 'Best day since asteroids!', 'Dino dance time!']
    },
    interactionResponses: {
      feed: ['CHOMP CHOMP!', 'Delicious!', 'Yummy in dino tummy!'],
      treat: ['Dino treats!', 'Best snack ever!', 'More please!'],
      play: ['Stomp stomp play!', 'This is dino-mite!', 'So fun!'],
      sleep: ['Dino dreams...', 'Sleepy time', 'Zzz...'],
      clean: ['Clean dino!', 'All fresh now!', 'Sparkly scales!'],
      medicine: ['Feeling stronger!', 'Dino power back!', 'All better!']
    },
    transitionMessages: {
      went_to_sleep: ['YAWN! Big dino sleepy', 'Time for prehistoric dreams', 'Dino bedtime!'],
      woke_up: ['ROAR! Good morning!', 'Dino ready to stomp!', 'What a dino-rific day!'],
      got_tired: ['Big dino getting sleepy', 'Need dino nap time', 'Tired from all the stomping'],
      got_hungry: ['Dino tummy RUMBLING!', 'Need BIG portions!', 'Hungry like T-Rex!'],
      got_dirty: ['Covered in prehistoric mud!', 'Messy dino alert!', 'Need big dino wash!'],
      got_sick: ['Dino not feeling mighty...', 'Prehistoric sniffles', 'Need dino medicine'],
      got_sad: ['Missing other dinos...', 'Lonely dinosaur', 'Need dino hugs'],
      got_better: ['ROAR! Dino strength back!', 'Mighty dino returns!', 'Ready to stomp again!']
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
  
  if (need && need !== null && personality.needMessages[need as Exclude<PetNeed, null>].length > 0) {
    const messages = personality.needMessages[need as Exclude<PetNeed, null>];
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

export function getTransitionMessage(pet: Pet, transition: string): string {
  const personality = getPetPersonality(pet.type);
  const messages = personality.transitionMessages[transition];
  
  if (messages && messages.length > 0) {
    return messages[Math.floor(Math.random() * messages.length)];
  }
  
  return '';
}