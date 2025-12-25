# Dog Walker App - Project Context

## Overview

A React Native Expo mobile application connecting dog owners with professional dog walkers.

## Project Information

- **Name**: Dog Walker
- **Type**: React Native Expo Mobile Application
- **Package Manager**: pnpm
- **Description**: A mobile app for dog owners to find, book, and manage dog walking services with trusted walkers.

## Project Structure

``` bash
/app              - Main application screens and routes
/components       - Reusable UI components
/constants        - App constants and configuration
/hooks            - Custom React hooks
/assets           - Images, fonts, static files
/scripts          - Build and utility scripts
/tests            - Unit and integration tests
/utils            - Utility functions
/types            - Type definitions
/styles           - App styles and themes
eslint.config.js  - ESLint configuration
biome.json        - Biome formatter configuration
tsconfig.json     - TypeScript configuration
app.json          - Expo configuration
package.json      - Project dependencies
```

## Tech Stack

- **Framework**: React Native with Expo SDK

- **Language**: TypeScript
- **Navigation**: React Navigation
- **State Management**: Context API, React Hooks, Zustand (if needed)
- **Styling**: StyleSheet API, Flexbox
- **Testing**: Jest, React Native Testing Library, Detox (E2E)
- **API**: fetch/Axios
- **Code Quality**: ESLint, Prettier, Codacy
- **CI/CD**: GitHub Actions
- **MCP Integration**: Supabase, Codacy, etc.

## Development Commands

```bash
pnpm install          # Install dependencies
pnpm start           # Start Expo dev server
pnpm android         # Run on Android
pnpm ios             # Run on iOS
pnpm test            # Run tests
pnpm lint            # Run ESLint
pnpm format          # Format code with Prettier
```

## Git Workflow

1. Create feature branch from main
2. Make changes and commit
3. Push to remote
4. Create pull request
5. Code review
6. Merge to main after approval

## Key Features (Planned)

- User authentication (dog owners & walkers)
- User profiles with photos and details
- Walk booking and scheduling system
- Real-time location tracking during walks
- In-app messaging between owners and walkers
- Payment integration
- Rating and review system
- Walk history and analytics
- Push notifications
- Map integration

## Target Platforms

- iOS
- Android

## Design Principles

- Mobile-first design
- Intuitive user experience
- Responsive layouts
- Platform-specific considerations
- Accessibility compliance
- Performance optimization

## Next Tasks

- Set up React Navigation
- Create main screen structure
- Design UI component library
- Implement routing between screens
- Set up authentication flow
- Create reusable UI components
- Integrate MCP tools
- Set up Codacy for code analysis and quality check
- Ensure coding standards compliance with Codacy analysis
