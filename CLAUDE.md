# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Architecture Overview

This is a Next.js 15 React application that creates an AI-powered virtual pet experience (PixelPet). The app combines traditional Tamagotchi-style pet care with modern AI conversations powered by Claude Haiku.

### Core Architecture

- **Next.js 15** with React 19 and TypeScript
- **Client-side state management** using React hooks and localStorage
- **Split-screen layout**: Pet care device (left) + AI chat (right)
- **Real-time pet simulation** with stat decay and age progression
- **Age-appropriate AI responses** based on owner's age (3-18+)

### Key Directories

- `app/` - Next.js App Router pages and API routes
- `components/` - React components including pet device and chat
- `lib/` - Core game logic, types, and utilities
- `components/pets/` - Individual pet species components with CSS art

### Pet System

The pet system centers around:
- **Pet Stats**: happiness, health, hunger, energy, cleanliness (0-100)
- **Pet States**: happy, sad, sleeping, eating, playing, sick, dead
- **Interactions**: feed, treat, play, sleep, clean, medicine
- **Lifespan**: Each pet type has different life expectancy ranges
- **Real-time Updates**: Stats decay over time, triggering state changes

### Data Flow

1. **Pet Creation**: `createPet()` in `lib/gameLogic.ts` initializes new pets
2. **State Updates**: `updatePetStats()` handles time-based decay every second
3. **Interactions**: `interactWithPet()` processes user actions
4. **Persistence**: All data auto-saves to localStorage
5. **AI Chat**: `/api/chat/route.ts` handles Claude API integration

### Pet Types & Personalities

- **Dragon**: Brave, fiery (7-14 days)
- **Unicorn**: Magical, gentle (10-20 days)  
- **Robot**: Logical, helpful (30-60 days)
- **Alien**: Quirky, mysterious (5-10 days)
- **Dinosaur**: Strong, protective (8-16 days)

### Age-Appropriate AI

The chat system adapts language and complexity based on owner age:
- Ages 3-5: Simple words, basic emotions
- Ages 6-9: Encouraging, educational
- Ages 10-12: Fun, relatable
- Ages 13-17: Contemporary, casual
- Ages 18+: Sophisticated, witty

### Component Structure

- `page.tsx` - Main app entry point with profile selection
- `GameLayout.tsx` - Split-screen layout wrapper
- `PixelPetDevice.tsx` - Pet display and interaction buttons
- `Chat.tsx` - AI conversation interface
- `PetDisplay.tsx` - Renders pet visual state
- `StatusBar.tsx` - Shows pet stats as progress bars

### API Integration

- `/api/chat/route.ts` - Claude Haiku API integration
- `/api/health/route.ts` - Health check endpoint
- Environment variable: `ANTHROPIC_API_KEY`

### State Management

No external state management library - uses React hooks:
- `useState` for component state
- `useEffect` for lifecycle events
- `localStorage` for persistence

### Styling

- **Tailwind CSS** for utility-first styling
- **CSS Art** for pet sprites (no external images)
- **Responsive design** with mobile-first approach
- **Custom colors** defined in `tailwind.config.js`

### Testing & Deployment

- Development: `npm run dev` on port 3000
- Production: Optimized for Netlify deployment
- No test framework currently configured