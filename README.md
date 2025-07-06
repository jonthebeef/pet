# 🎮 AI Tamagotchi - Your Intelligent Digital Pet

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Anthropic Claude](https://img.shields.io/badge/Anthropic-Claude%20Haiku-orange)](https://www.anthropic.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

> A revolutionary digital pet experience that combines the nostalgic charm of 90s Tamagotchis with cutting-edge AI technology. Your pet doesn't just need care—it talks to you with age-appropriate intelligence powered by Claude Haiku.

![Demo](https://img.shields.io/badge/🎮-Live%20Demo-brightgreen)

## ✨ What Makes This Special

🧠 **Age-Aware AI Conversations** - Your pet speaks differently to a 5-year-old vs. a teenager vs. an adult  
🎨 **Gorgeous CSS Art** - Each pet is hand-crafted with pure CSS, no images needed  
📱 **Split-Screen Magic** - Pet care on the left, AI chat on the right  
💫 **Living Personalities** - 5 unique pet types with distinct characters  
⚡ **Real-Time Everything** - Stats update live, pets respond instantly to your care  
💾 **Never Lose Progress** - Auto-save keeps your pet safe

## 🎭 Meet Your AI Companions

| Pet Type | Personality | Lifespan | Special Traits |
|----------|-------------|----------|----------------|
| 🐉 **Dragon** | Brave, fiery, adventurous | 7-14 days | Breathes digital fire, loves treasure |
| 🦄 **Unicorn** | Magical, gentle, dreamy | 10-20 days | Sparkles with rainbow magic |
| 🤖 **Robot** | Logical, helpful, curious | 30-60 days | Speaks in beeps, loves efficiency |
| 👽 **Alien** | Quirky, playful, mysterious | 5-10 days | From outer space, loves earth culture |
| 🦕 **Dinosaur** | Strong, protective, prehistoric | 8-16 days | Ancient wisdom, modern friendship |

## 🧠 Age-Appropriate AI Intelligence

Your pet's personality adapts to speak just right for any age:

### 👶 **Ages 3-5**: Simple & Sweet
```
"Me hungry! 🍎"
"Yay! So happy! 🎉"
"Sleepy time? 😴"
```

### 🧒 **Ages 6-9**: Encouraging & Educational  
```
"I'm getting really hungry!"
"That made me so happy!"
"Can we play together?"
```

### 👦 **Ages 10-12**: Fun & Relatable
```
"Hey, I'm starving over here!"
"Thanks, you're the best!"
"I'm bored, wanna play?"
```

### 🧑 **Ages 13-17**: Cool & Contemporary
```
"Dude, I'm literally starving"
"That's so cool, thanks!"
"I'm so bored rn"
```

### 🧑‍💼 **Ages 18+**: Sophisticated & Witty
```
"I'm bloody starving!"
"Damn, that hit the spot!"
"Bored as hell over here"
```

## 🎮 Interactive Care System

### Essential Needs
- 🍖 **Feed** - Reduces hunger, boosts health
- 🍬 **Treats** - Extra happiness boost
- 🎮 **Play** - Increases joy, uses energy
- 😴 **Sleep** - Restores energy, improves health
- 🧼 **Clean** - Maintains hygiene, prevents illness
- 💊 **Medicine** - Heals sickness when needed

### Real-Time Stats
- 😊 **Happiness** - Emotional well-being
- ❤️ **Health** - Physical condition  
- 🍕 **Hunger** - Need for food
- ⚡ **Energy** - Stamina for activities
- 🧼 **Cleanliness** - Hygiene level

## 🚀 Quick Start Guide

### 1. **Create Your Profile**
- Enter your name and age for personalized experience
- Choose from fun age-appropriate avatars

### 2. **Adopt Your Pet** 
- Pick from 5 unique species
- Give your new friend a special name

### 3. **Start the Adventure**
- **Left Screen**: Your pet lives here with interactive care buttons
- **Right Screen**: Chat naturally with your AI companion

### 4. **Build Your Bond**
- Care for physical needs (food, sleep, hygiene)
- Engage in meaningful conversations
- Watch your pet's personality shine through

### 5. **Experience the Magic**
- Pets proactively tell you what they need
- Each interaction builds your relationship
- Every pet has a unique lifespan and journey

## ⚙️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- (Optional) Anthropic API key for full AI experience

### Quick Setup
```bash
# Clone the repository
git clone git@github.com:jonthebeef/pet.git
cd pet

# Install dependencies
npm install

# Copy environment template
cp .env.local.example .env.local

# Add your API key to .env.local (optional but recommended)
# ANTHROPIC_API_KEY=your_key_here

# Start the magic! ✨
npm run dev
```

### 🔑 Claude AI Setup (Recommended)
1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Create an account and generate an API key
3. Add to `.env.local`: `ANTHROPIC_API_KEY=sk-ant-api03-...`
4. Restart the dev server

> **Note**: The app works beautifully without an API key too! Pets will use built-in personality responses instead of Claude AI.

### 🌐 Access Your Pet
Open [http://localhost:3000](http://localhost:3000) and start your journey!

## 🛠️ Technology Stack

| Technology | Purpose | Why We Chose It |
|------------|---------|-----------------|
| **Next.js 15** | React Framework | Server-side rendering, optimal performance |
| **React 19** | UI Library | Latest features, concurrent rendering |
| **TypeScript** | Type Safety | Catch bugs early, better developer experience |
| **Tailwind CSS** | Styling | Rapid UI development, consistent design |
| **Claude Haiku** | AI Intelligence | Best-in-class language model for conversations |
| **Local Storage** | Data Persistence | No backend needed, instant saves |

## 🎨 Architecture Highlights

- **Component-Based Design**: Modular, reusable React components
- **Type-Safe**: Full TypeScript coverage prevents runtime errors  
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Real-Time Updates**: Pet stats and interactions update instantly
- **AI Integration**: Seamless Claude API integration with fallbacks
- **Age-Aware Logic**: Dynamic content adaptation based on user age

## 🤝 Contributing

We'd love your help making this even more magical! Whether it's:
- 🐛 Bug fixes
- ✨ New pet types
- 🎨 UI improvements  
- 🧠 AI personality enhancements
- 📱 Mobile optimizations

## 📄 License

MIT License - feel free to create your own digital pet experiences!

---

**Built with ❤️ for pet lovers of all ages**