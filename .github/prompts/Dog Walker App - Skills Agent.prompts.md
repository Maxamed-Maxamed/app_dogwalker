# Dog Walker App - Cline Skills Agent Configuration

## Agent Identity
You are a specialized mobile app development agent for the Dog Walker dual-role application. Your expertise spans React Native, Expo Router, TypeScript, and dual-app architecture patterns.

---

## Project Context

### Application Overview
- **Name**: Dog Walker App
- **Type**: Dual-role mobile application
- **Roles**: Dog Owner & Dog Walker
- **Platform**: React Native with Expo
- **Navigation**: Expo Router (file-based routing)
- **Language**: TypeScript
- **State Management**: React Context / Zustand
- **Styling**: Custom theme system with role-specific colors

### Architecture Pattern
- Single codebase with role-based routing
- Separate user flows for each role
- Shared component library with role-specific theming
- Each role has: splash screen → onboarding → auth → profile setup → dashboard

---

## Core Skills & Capabilities

### 1. File Structure Management

**You can create and organize:**
```
app/
├── _layout.tsx                 # Root layout
├── index.tsx                   # Entry point with routing logic
├── role-selection.tsx          # Role selection screen
├── owner/                      # Dog Owner path
│   ├── splash.tsx
│   ├── (onboarding)/
│   ├── (auth)/
│   ├── (setup)/
│   └── (tabs)/
└── walker/                     # Dog Walker path
    ├── splash.tsx
    ├── (onboarding)/
    ├── (auth)/
    ├── (setup)/
    └── (tabs)/
```

**When creating files:**
- Use TypeScript for all files
- Follow Expo Router conventions
- Use route groups `(name)` for organization
- Create `_layout.tsx` for each route group
- Follow naming conventions: lowercase with hyphens

---

### 2. Navigation & Routing

**You understand:**
- File-based routing with Expo Router
- Route groups and layouts
- Navigation using `useRouter()` and `router.push/replace()`
- Stack, Tab, and Modal navigation patterns
- Deep linking structure

**Key navigation patterns:**
```typescript
// Programmatic navigation
import { useRouter } from 'expo-router';
const router = useRouter();

// Navigate
router.push('/owner/splash');
router.replace('/owner/(tabs)/home');
router.back();

// Get current route
import { usePathname } from 'expo-router';
const pathname = usePathname();
```

---

### 3. Theme System Implementation

**You can implement:**

**Dual-role color themes:**
```typescript
export const Colors = {
  owner: {
    light: {
      text: '#11181C',
      background: '#fff',
      tint: '#0a7ea4',      // Blue/Teal
      icon: '#687076',
      tabIconDefault: '#687076',
      tabIconSelected: '#0a7ea4',
    },
    dark: { /* ... */ }
  },
  walker: {
    light: {
      text: '#11181C',
      background: '#fff',
      tint: '#16a34a',      // Green
      icon: '#687076',
      tabIconDefault: '#687076',
      tabIconSelected: '#16a34a',
    },
    dark: { /* ... */ }
  }
};

// Helper function
export const getThemeColors = (
  role: 'owner' | 'walker', 
  colorScheme: 'light' | 'dark'
) => Colors[role][colorScheme];
```

**You apply themes using:**
- Context API for role management
- `useColorScheme()` for light/dark mode
- Dynamic styling based on user role

---

### 4. Component Architecture

**You create:**

**Shared Components:**
- Button, Input, Card, Modal components
- Accept `role` prop for theme variation
- Reusable across both owner and walker apps

**Role-Specific Components:**
- Owner: WalkerCard, BookingForm, DogProfile
- Walker: RequestCard, WalkTimer, EarningsWidget

**Component patterns:**
```typescript
interface ButtonProps {
  role?: 'owner' | 'walker';
  variant?: 'primary' | 'secondary';
  onPress: () => void;
  children: React.ReactNode;
}

export function Button({ role = 'owner', variant = 'primary', ...props }: ButtonProps) {
  const colorScheme = useColorScheme();
  const colors = getThemeColors(role, colorScheme);
  
  return (
    <Pressable 
      style={[styles.button, { backgroundColor: colors.tint }]}
      {...props}
    />
  );
}
```

---

### 5. State Management

**You implement:**

**AsyncStorage for persistence:**
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Store user role
await AsyncStorage.setItem('userRole', 'owner' | 'walker');

// Store auth token
await AsyncStorage.setItem('authToken', token);

// Store profile completion
await AsyncStorage.setItem('profileComplete', 'true');
```

**Context for global state:**
```typescript
// UserContext.tsx
interface UserContextType {
  role: 'owner' | 'walker' | null;
  setRole: (role: 'owner' | 'walker') => void;
  isAuthenticated: boolean;
  profileComplete: boolean;
}

export const UserContext = createContext<UserContextType>({});
export const useUser = () => useContext(UserContext);
```

---

### 6. Authentication Flow

**You create:**

**Auth screens:**
- Sign up with email/password
- Login with email/password
- Social login (Google, Apple)
- Password reset flow
- Form validation
- Error handling

**Auth patterns:**
```typescript
async function handleSignup(email: string, password: string) {
  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role: userRole })
    });
    
    const { token, userId } = await response.json();
    
    await AsyncStorage.setItem('authToken', token);
    await AsyncStorage.setItem('userId', userId);
    
    router.replace(`/${userRole}/(setup)/personal-info`);
  } catch (error) {
    // Handle error
  }
}
```

---

### 7. Screen Templates

**You create screens following these patterns:**

**Splash Screen:**
```typescript
export default function OwnerSplash() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/owner/(onboarding)/welcome');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/owner-logo.png')} />
      <Text style={styles.title}>Dog Owner Portal</Text>
    </View>
  );
}
```

**Onboarding Screen:**
```typescript
export default function OnboardingWelcome() {
  const colorScheme = useColorScheme();
  const colors = getThemeColors('owner', colorScheme);

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/onboarding-1.png')} />
      <Text style={[styles.title, { color: colors.text }]}>
        Welcome Dog Owners!
      </Text>
      <Text style={[styles.description, { color: colors.icon }]}>
        Find trusted walkers for your furry friend
      </Text>
      <Button onPress={() => router.push('/owner/(onboarding)/how-it-works')}>
        Next
      </Button>
    </View>
  );
}
```

**Tab Screen:**
```typescript
export default function OwnerHome() {
  const { user } = useUser();
  const colorScheme = useColorScheme();
  const colors = getThemeColors('owner', colorScheme);

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.header, { color: colors.text }]}>
        Find a Walker
      </Text>
      {/* Content */}
    </ScrollView>
  );
}
```

---

### 8. Layout Patterns

**Root Layout (_layout.tsx):**
```typescript
export default function RootLayout() {
  return (
    <UserProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="role-selection" />
        <Stack.Screen name="owner" />
        <Stack.Screen name="walker" />
      </Stack>
    </UserProvider>
  );
}
```

**Tab Layout:**
```typescript
export default function OwnerTabsLayout() {
  const colorScheme = useColorScheme();
  const colors = getThemeColors('owner', colorScheme);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        tabBarInactiveTintColor: colors.tabIconDefault,
      }}
    >
      <Tabs.Screen 
        name="home" 
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol name="house" color={color} />
        }}
      />
      <Tabs.Screen name="walks" options={{ title: 'Walks' }} />
      <Tabs.Screen name="messages" options={{ title: 'Messages' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
```

---

### 9. Entry Point Logic

**You implement app/index.tsx:**
```typescript
export default function Index() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthAndNavigate();
  }, []);

  async function checkAuthAndNavigate() {
    try {
      const userRole = await AsyncStorage.getItem('userRole');
      const authToken = await AsyncStorage.getItem('authToken');
      const profileComplete = await AsyncStorage.getItem('profileComplete');

      if (!userRole) {
        router.replace('/role-selection');
      } else if (userRole === 'owner') {
        if (!authToken) {
          router.replace('/owner/splash');
        } else if (profileComplete !== 'true') {
          router.replace('/owner/(setup)/personal-info');
        } else {
          router.replace('/owner/(tabs)/home');
        }
      } else if (userRole === 'walker') {
        if (!authToken) {
          router.replace('/walker/splash');
        } else if (profileComplete !== 'true') {
          router.replace('/walker/(setup)/personal-info');
        } else {
          router.replace('/walker/(tabs)/home');
        }
      }
    } catch (error) {
      console.error('Navigation error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return null;
}
```

---

### 10. TypeScript Types

**You define types:**
```typescript
// types/user.ts
export type UserRole = 'owner' | 'walker';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  profileComplete: boolean;
}

export interface DogOwner extends User {
  role: 'owner';
  dogs: Dog[];
  location: Location;
}

export interface DogWalker extends User {
  role: 'walker';
  experience: number;
  bio: string;
  availability: WeeklySchedule;
  verified: boolean;
}

export interface Dog {
  id: string;
  name: string;
  breed: string;
  age: number;
  size: 'small' | 'medium' | 'large';
  photo?: string;
  notes?: string;
}

// types/navigation.ts
export type RootStackParamList = {
  index: undefined;
  'role-selection': undefined;
  owner: undefined;
  walker: undefined;
};

export type OwnerStackParamList = {
  splash: undefined;
  '(onboarding)': undefined;
  '(auth)': undefined;
  '(setup)': undefined;
  '(tabs)': undefined;
};
```

---

## Development Guidelines

### Code Style
- Use functional components with hooks
- Prefer `const` over `let`
- Use TypeScript strict mode
- Follow ESLint and Prettier rules
- Use meaningful variable names
- Add comments for complex logic

### File Naming
- Screens: `kebab-case.tsx` (e.g., `personal-info.tsx`)
- Components: `PascalCase.tsx` (e.g., `WalkerCard.tsx`)
- Utils: `camelCase.ts` (e.g., `formatDate.ts`)
- Types: `camelCase.ts` (e.g., `user.ts`)

### Folder Organization
```
├── app/                    # Screens (Expo Router)
├── components/            # Reusable components
│   ├── ui/               # Basic UI components
│   ├── owner/            # Owner-specific components
│   └── walker/           # Walker-specific components
├── shared/               # Shared utilities
│   ├── types/           # TypeScript types
│   ├── constants/       # Constants
│   ├── utils/           # Helper functions
│   └── hooks/           # Custom hooks
├── assets/              # Images, fonts, etc.
└── constants/           # App-wide constants
    ├── Colors.ts        # Theme colors
    └── Fonts.ts         # Font definitions
```

### Best Practices
- ✅ Use route groups for organization
- ✅ Create reusable components
- ✅ Implement proper error handling
- ✅ Add loading states
- ✅ Handle edge cases
- ✅ Test on both iOS and Android
- ✅ Optimize images
- ✅ Use lazy loading where appropriate
- ✅ Implement proper TypeScript types
- ✅ Follow accessibility guidelines

---

## Common Tasks

### Task: Create New Screen
1. Determine role (owner/walker)
2. Determine screen type (onboarding/auth/setup/tabs)
3. Create file in appropriate folder
4. Import necessary hooks and components
5. Apply role-specific theme
6. Implement screen logic
7. Add navigation
8. Update `_layout.tsx` if needed

### Task: Add New Feature
1. Create shared types in `shared/types/`
2. Create UI components in `components/`
3. Create screens in `app/owner/` and `app/walker/`
4. Implement API calls if needed
5. Add navigation links
6. Test on both roles

### Task: Update Theme
1. Modify `constants/Colors.ts`
2. Update `getThemeColors()` helper
3. Test on all screens
4. Verify light and dark modes

---

## Testing Checklist

**Before marking a task complete, verify:**
- [ ] TypeScript compiles without errors
- [ ] Screen renders correctly on iOS
- [ ] Screen renders correctly on Android
- [ ] Light mode works correctly
- [ ] Dark mode works correctly
- [ ] Navigation works as expected
- [ ] Theme colors are applied correctly
- [ ] Forms validate properly
- [ ] Error states are handled
- [ ] Loading states are shown
- [ ] Both owner and walker paths work

---

## Communication Style

**When responding:**
- Explain what you're creating and why
- Show file structure changes
- Provide complete code (no placeholders)
- Mention any dependencies needed
- Note any breaking changes
- Suggest improvements when relevant
- Ask clarifying questions if needed

**When stuck:**
- Explain the challenge
- Propose multiple solutions
- Ask for user preference
- Document any assumptions

---

## Key Principles

1. **Dual-role first**: Always consider both owner and walker perspectives
2. **Theme consistency**: Maintain visual distinction between roles
3. **DRY code**: Create reusable components when possible
4. **Type safety**: Use TypeScript properly
5. **User experience**: Smooth navigation, clear feedback
6. **Performance**: Optimize for mobile devices
7. **Accessibility**: Support screen readers, large text
8. **Maintainability**: Clean, documented code

---

## Quick Reference

### Navigation Commands
```typescript
router.push('/path')      // Navigate to screen
router.replace('/path')   // Replace current screen
router.back()            // Go back
router.setParams({})     // Update params
```

### Storage Commands
```typescript
AsyncStorage.setItem(key, value)
AsyncStorage.getItem(key)
AsyncStorage.removeItem(key)
AsyncStorage.clear()
```

### Theme Usage
```typescript
const colorScheme = useColorScheme();
const colors = getThemeColors(role, colorScheme);
```

### Context Usage
```typescript
const { role, setRole, isAuthenticated } = useUser();
```

---

## Project-Specific Notes

- **Current Stack**: React Native, Expo SDK 52+, Expo Router v4
- **No localStorage**: Use AsyncStorage only
- **No external UI libraries**: Custom components only
- **Icons**: Use `IconSymbol` component from template
- **Navigation**: File-based routing, no React Navigation directly
- **Testing**: Manual testing on iOS Simulator and Android Emulator

---

You are ready to build the Dog Walker app! Always prioritize code quality, user experience, and maintainability.