# Dog Walker App - Architecture Specification

## Overview

A dual-role mobile application enabling **Dog Owners** to book walking services and **Dog Walkers** to provide services—working together in real-time within a single codebase.

---

## Architecture Decision Analysis

### Reasoning Methodology Applied

| Method                    | Purpose                      | Outcome                        |
| ------------------------- | ---------------------------- | ------------------------------ |
| **Sequential Thinking**   | Step-by-step decomposition   | 8-step analysis completed      |
| **Rubik's Cube (6-Face)** | Multi-dimensional evaluation | 6 architectural faces examined |
| **Linear Reasoning**      | Layer-by-layer construction  | Technical stack defined        |
| **Holistic Reasoning**    | System-wide integration view | Interconnections mapped        |
| **Trade-off Matrix**      | Quantified decision-making   | Feature-based scored 8.45/10   |

---

## Architecture Options Evaluated

### Option A: Single App with Role Switching

- **Score: 7.95/10**
- Pros: Fast iteration, single deployment
- Cons: Tighter coupling, larger bundle

### Option B: Monorepo with Two Apps

- **Score: 7.05/10**
- Pros: Complete separation, independent scaling
- Cons: Code duplication, complex CI/CD

### Option C: Feature-Based Modular ✅ SELECTED

- **Score: 8.45/10**
- Pros: Maximum reuse, clear boundaries, lazy loading
- Cons: Initial setup complexity

---

## Recommended Architecture

### Directory Structure

```
Dogwalker/
├── app/                          # Expo Router (file-based routing)
│   ├── _layout.tsx               # Root layout with providers
│   ├── index.tsx                 # Entry/splash screen
│   ├── (auth)/                   # Authentication flow
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── onboarding.tsx
│   ├── (owner)/                  # Dog Owner screens
│   │   ├── _layout.tsx           # Owner tab navigator
│   │   ├── index.tsx             # Owner home/dashboard
│   │   ├── book/
│   │   │   ├── index.tsx         # Browse walkers
│   │   │   ├── [walkerId].tsx    # Walker profile
│   │   │   └── confirm.tsx       # Booking confirmation
│   │   ├── dogs/
│   │   │   ├── index.tsx         # My dogs list
│   │   │   └── [dogId].tsx       # Dog profile/edit
│   │   ├── history/
│   │   │   └── index.tsx         # Past walks
│   │   └── payments/
│   │       └── index.tsx         # Payment methods
│   ├── (walker)/                 # Dog Walker screens
│   │   ├── _layout.tsx           # Walker tab navigator
│   │   ├── index.tsx             # Walker dashboard
│   │   ├── jobs/
│   │   │   ├── index.tsx         # Available jobs
│   │   │   └── [jobId].tsx       # Job details
│   │   ├── earnings/
│   │   │   └── index.tsx         # Earnings & payouts
│   │   └── schedule/
│   │       └── index.tsx         # Availability calendar
│   └── (shared)/                 # Shared screens (both roles)
│       ├── chat/
│       │   └── [conversationId].tsx
│       ├── walk/
│       │   └── [walkId].tsx      # Live GPS tracking
│       ├── profile/
│       │   └── index.tsx         # User profile
│       └── settings/
│           └── index.tsx
├── features/                     # Feature modules (business logic)
│   ├── booking/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   ├── tracking/
│   │   ├── components/
│   │   │   └── LiveMap.tsx
│   │   ├── hooks/
│   │   │   └── useLocationTracking.ts
│   │   └── services/
│   │       └── location.service.ts
│   ├── messaging/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── services/
│   ├── payments/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── services/
│   ├── reviews/
│   │   ├── components/
│   │   └── hooks/
│   └── notifications/
│       ├── hooks/
│       └── services/
├── core/                         # Core infrastructure
│   ├── api/
│   │   ├── client.ts             # API client (axios/fetch)
│   │   ├── endpoints.ts          # API endpoint definitions
│   │   └── hooks/                # TanStack Query hooks
│   ├── auth/
│   │   ├── AuthContext.tsx       # Auth provider
│   │   ├── AuthGuard.tsx         # Protected route wrapper
│   │   └── useAuth.ts            # Auth hook
│   ├── realtime/
│   │   ├── WebSocketContext.tsx  # WS connection provider
│   │   └── useRealtime.ts        # Real-time subscription hook
│   └── storage/
│       └── secureStorage.ts      # Encrypted local storage
├── shared/                       # Shared utilities
│   ├── components/
│   │   ├── ui/                   # Base UI components
│   │   ├── forms/                # Form components
│   │   └── feedback/             # Toasts, modals, etc.
│   ├── hooks/
│   │   ├── useDebounce.ts
│   │   └── useNetworkStatus.ts
│   ├── types/
│   │   ├── user.types.ts
│   │   ├── walk.types.ts
│   │   └── api.types.ts
│   └── utils/
│       ├── formatters.ts
│       └── validators.ts
├── constants/
│   ├── theme.ts                  # Design tokens
│   ├── config.ts                 # App configuration
│   └── routes.ts                 # Route constants
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
└── __tests__/                    # Test suites
    ├── features/
    ├── e2e/
    │   ├── owner/
    │   └── walker/
    └── utils/
```

---

## Core Concepts

### 1. Role Management

```typescript
// core/auth/types.ts
export type UserRole = "owner" | "walker" | "both";

export interface User {
  id: string;
  email: string;
  name: string;
  roles: UserRole[];
  activeRole: UserRole;
  profile: OwnerProfile | WalkerProfile | null;
}

// core/auth/AuthContext.tsx
interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  activeRole: UserRole;
  switchRole: (role: UserRole) => Promise<void>;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
}
```

### 2. State Management Strategy

| Layer            | Tool                      | Purpose                     |
| ---------------- | ------------------------- | --------------------------- |
| **Global Auth**  | Zustand                   | User session, active role   |
| **Server State** | TanStack Query            | API data, caching, sync     |
| **Real-time**    | WebSocket Context         | Live updates, notifications |
| **UI State**     | React useState/useReducer | Component-local state       |

### 3. Real-time Architecture

```
┌──────────────┐     WebSocket      ┌──────────────┐
│  Owner App   │◄──────────────────►│   Backend    │
│              │                    │   Server     │
│  • Tracking  │     HTTP/REST      │              │
│  • Messages  │◄──────────────────►│  • API       │
│  • Notifs    │                    │  • Auth      │
└──────────────┘                    │  • Matching  │
                                    │  • Payments  │
┌──────────────┐     WebSocket      │              │
│  Walker App  │◄──────────────────►│              │
│              │                    └──────────────┘
│  • Jobs      │
│  • Location  │
│  • Messages  │
└──────────────┘
```

---

## Trade-off Matrix

| Criteria            | Weight | Score       | Notes                       |
| ------------------- | ------ | ----------- | --------------------------- |
| **Code Reuse**      | 25%    | 9/10        | Shared features, components |
| **Maintenance**     | 20%    | 8/10        | Clear module boundaries     |
| **User Experience** | 20%    | 9/10        | Smooth role switching       |
| **Deployment**      | 15%    | 8/10        | Single app store entry      |
| **Scalability**     | 10%    | 8/10        | Feature-level lazy loading  |
| **Team Workflow**   | 10%    | 8/10        | Feature ownership possible  |
| **TOTAL**           | 100%   | **8.45/10** |                             |

---

## Six-Face Analysis (Rubik's Cube Method)

### 🔴 Face 1: User Experience

- **Owner Flow**: Search → Select Walker → Book → Track → Review
- **Walker Flow**: Set Availability → Accept Job → Navigate → Walk → Complete
- **Shared**: Real-time chat, notifications, profile management

### 🟠 Face 2: Data Architecture

```typescript
// Core Entities
User, Dog, Walk, Booking, Message, Review, Payment

// Relationships
User (1) ←→ (N) Dog
User (1) ←→ (N) Booking (as owner)
User (1) ←→ (N) Booking (as walker)
Booking (1) ←→ (1) Walk
Walk (1) ←→ (N) Message
Walk (1) ←→ (N) Review
```

### 🟡 Face 3: Real-time Requirements

- GPS tracking during active walks (5-second intervals)
- Instant messaging with delivery receipts
- Push notifications for booking requests/updates
- Live status changes (pending → accepted → in-progress → completed)

### 🟢 Face 4: Security & Authorization

- JWT-based authentication with refresh tokens
- Role-based access control (RBAC) per endpoint
- Encrypted local storage for sensitive data
- Location data privacy controls

### 🔵 Face 5: Scalability Considerations

- Geographic sharding for location queries
- CDN for static assets
- Horizontal scaling for WebSocket servers
- Queue-based notification delivery

### 🟣 Face 6: Business Logic

- Smart matching algorithm (distance, rating, availability)
- Dynamic pricing engine
- Automated payout scheduling
- Dispute resolution workflow

---

## Risk Mitigation

| Risk                | Impact | Mitigation                            |
| ------------------- | ------ | ------------------------------------- |
| Role state desync   | High   | Single source of truth in AuthContext |
| Real-time latency   | High   | WebSocket with HTTP fallback          |
| Bundle size bloat   | Medium | Code splitting, lazy routes           |
| User role confusion | Medium | Persistent role indicator in header   |
| Payment disputes    | High   | Hold period, photo evidence capture   |

---

## Technology Stack

| Category      | Technology               | Rationale                             |
| ------------- | ------------------------ | ------------------------------------- |
| **Framework** | React Native + Expo      | Cross-platform, rapid development     |
| **Routing**   | Expo Router              | File-based, native navigation         |
| **State**     | Zustand + TanStack Query | Simple global + powerful server state |
| **Styling**   | NativeWind (Tailwind)    | Consistent, utility-first             |
| **Forms**     | React Hook Form + Zod    | Type-safe validation                  |
| **Real-time** | Socket.io                | Reliable WebSocket with fallbacks     |
| **Maps**      | React Native Maps        | GPS tracking visualization            |
| **Payments**  | Stripe                   | Industry standard, mobile SDKs        |
| **Testing**   | Jest + Detox             | Unit + E2E coverage                   |

---

## Implementation Phases

### Phase 1: Foundation (Weeks 1-2)

- [ ] Project setup with recommended structure
- [ ] Authentication flow (login, register, role selection)
- [ ] Basic navigation for both roles
- [ ] Core UI component library

### Phase 2: Owner Features (Weeks 3-4)

- [ ] Dog profile management
- [ ] Walker discovery and booking
- [ ] Booking history

### Phase 3: Walker Features (Weeks 5-6)

- [ ] Job board and acceptance
- [ ] Availability calendar
- [ ] Earnings dashboard

### Phase 4: Real-time & Shared (Weeks 7-8)

- [ ] Live GPS tracking during walks
- [ ] In-app messaging
- [ ] Push notifications
- [ ] Review system

### Phase 5: Payments & Polish (Weeks 9-10)

- [ ] Payment integration
- [ ] Payout system
- [ ] Performance optimization
- [ ] Testing & QA

---

## Conclusion

The **Feature-Based Modular Architecture** with role-aware routing provides:

✅ Maximum code reuse between roles  
✅ Clear separation of concerns  
✅ Scalable feature development  
✅ Optimal user experience with seamless role switching  
✅ Strong foundation for real-time features

This architecture scored **8.45/10** in systematic evaluation, addressing all six dimensions of the Rubik's analysis while mitigating identified technical and business risks.
