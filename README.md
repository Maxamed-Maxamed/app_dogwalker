# 🐕 DogWalker

A dual-role mobile application for iOS and Android that connects **Dog Owners** with trusted **Dog Walkers**. Find, book, and track dog walking services in real-time.

![Expo](https://img.shields.io/badge/Expo-54.0.31-000020?style=flat-square&logo=expo)
![React Native](https://img.shields.io/badge/React%20Native-0.81.5-61DAFB?style=flat-square&logo=react)
![NativeWind](https://img.shields.io/badge/NativeWind-4.2.1-06B6D4?style=flat-square&logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20DB-3FCF8E?style=flat-square&logo=supabase)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178C6?style=flat-square&logo=typescript)

## 📑 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Development Workflow](#development-workflow)
- [Styling with NativeWind](#styling-with-nativewind)
- [Code Quality](#code-quality)
- [AI Development Tools](#aidevelopment-tools)
- [Scripts](#scripts)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Security](#security)
- [License](#license)

## ✨ Features

### For Dog Owners

- 🔍 **Find a Walker** - Search and compare local walkers by profiles, reviews, and background-check status
- 📅 **Book a Walk** - Choose service type, duration, date/time, and complete payment
- 📍 **Live Tracking** - Follow your dog's walk in real-time with GPS tracking
- 💬 **In-App Messaging** - Chat directly with your walker
- ⭐ **Reviews** - Rate and review walkers after each walk

### For Dog Walkers

- 📋 **Job Board** - Browse and accept available walking jobs
- 📆 **Schedule Management** - Set your availability calendar
- 💰 **Earnings Dashboard** - Track earnings and payouts
- 🗺️ **Navigation** - Get directions to pickup locations

## Tech Stack

| Category             | Technology                                                                              | Version  |
| -------------------- | --------------------------------------------------------------------------------------- | -------- |
| **Framework**        | [Expo](https://expo.dev) (React Native)                                                 | 54.0.31  |
| **Runtime**          | [React Native](https://reactnative.dev/)                                                | 0.81.5   |
| **Routing**          | [Expo Router](https://docs.expo.dev/router/introduction/)                               | 6.0.21   |
| **Styling**          | [NativeWind](https://www.nativewind.dev/) (Tailwind CSS)                                | 4.2.1    |
| **State Management** | [Zustand](https://zustand-demo.pmnd.rs/) + [TanStack Query](https://tanstack.com/query) | 5.x      |
| **Forms**            | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)               | 7.70 / 4 |
| **Database/Auth**    | [Supabase](https://supabase.com/)                                                       | 2.89+    |
| **Maps**             | [Expo Maps](https://docs.expo.dev/versions/latest/sdk/maps/)                            | 0.12.10  |
| **Location**         | [Expo Location](https://docs.expo.dev/versions/latest/sdk/location/)                    | 19.0.8   |
| **Language**         | [TypeScript](https://www.typescriptlang.org/)                                           | 5.9.2    |

## 📁 Project Structure

```bash
Dogwalker/
├── .codacy/                    # Codacy CLI configuration
│   ├── cli-config.yaml         # CLI settings
│   ├── codacy.yaml             # Analysis configuration
│   └── tools-configs/          # Tool-specific configs (eslint, semgrep, trivy)
├── .github/                    # GitHub configuration
│   ├── agents/                 # AI agent definitions
│   │   └── skills.agent.md     # Skills agent configuration
│   ├── instructions/           # Copilot instructions
│   │   └── codacy.instructions.md
│   ├── prompts/                # AI prompts
│   │   ├── DOG_WALKER_APP_RESEARCH.prompt.md
│   │   ├── Dog_Walker_App.prompt.md
│   │   └── expertofapp.prompt.md
│   └── spec/                   # Project specifications
│       ├── CodeArchitecture.prompt.md
│       └── spec-sheet.prompt.md
├── .qlty/                      # Qlty CLI configuration
│   ├── qlty.toml               # Main configuration
│   └── configs/                # Plugin configs
├── .vscode/                    # VS Code settings
│   ├── extensions.json         # Recommended extensions
│   ├── mcp.json                # MCP server configuration
│   └── settings.json           # Workspace settings
├── app/                        # Expo Router (file-based routing)
│   ├── _layout.tsx             # Root layout with providers
│   ├── index.tsx               # Entry point
│   ├── role-selection.tsx      # Choose Owner or Walker role
│   ├── +not-found.tsx          # 404 screen
│   ├── owner/                  # Dog Owner screens
│   │   ├── _layout.tsx         # Owner layout
│   │   ├── index.tsx           # Owner home
│   │   ├── splash.tsx          # Owner splash screen
│   │   ├── (auth)/             # Authentication screens
│   │   ├── (onboarding)/       # Onboarding flow
│   │   ├── (setup)/            # Profile setup
│   │   └── (tabs)/             # Main tabs (home, walks, messages, profile)
│   └── walker/                 # Dog Walker screens
│       ├── _layout.tsx         # Walker layout
│       ├── index.tsx           # Walker home
│       ├── splash.tsx          # Walker splash screen
│       ├── (auth)/             # Authentication screens
│       ├── (onboarding)/       # Onboarding flow
│       ├── (setup)/            # Profile & verification
│       └── (tabs)/             # Main tabs (home, schedule, messages, profile)
├── assets/                     # Static assets
│   ├── fonts/                  # Poppins font family
│   ├── icons/                  # App icons (dashboard, home, paws, profile)
│   └── images/                 # App images and logos
├── components/                 # Reusable UI components
│   ├── ui/                     # Base UI components
│   │   ├── collapsible.tsx     # Collapsible component
│   │   ├── icon-symbol.tsx     # Cross-platform icons
│   │   └── icon-symbol.ios.tsx # iOS-specific icons
│   ├── external-link.tsx       # External link handler
│   ├── haptic-tab.tsx          # Tab with haptic feedback
│   ├── hello-wave.tsx          # Animated wave component
│   ├── parallax-scroll-view.tsx # Parallax scrolling
│   ├── splash-screen.tsx       # Splash screen component
│   ├── themed-text.tsx         # Theme-aware text
│   └── themed-view.tsx         # Theme-aware view
├── constants/                  # Theme and configuration
│   ├── theme.ts                # Main theme colors
│   ├── owner-colors.ts         # Owner-specific theme (blue/teal)
│   └── walker-colors.ts        # Walker-specific theme (green/orange)
├── hooks/                      # Custom React hooks
│   ├── use-color-scheme.ts     # Color scheme detection
│   ├── use-color-scheme.web.ts # Web-specific color scheme
│   └── use-theme-color.ts      # Theme color accessor
├── scripts/                    # Utility scripts
│   └── reset-project.js        # Project reset script
├── .env.local                  # Environment variables (git-ignored)
├── .gitignore                  # Git ignore rules
├── app.json                    # Expo configuration
├── babel.config.js             # Babel configuration
├── eslint.config.js            # ESLint flat config
├── expo-env.d.ts               # Expo TypeScript definitions
├── global.css                  # Tailwind CSS directives
├── metro.config.js             # Metro bundler configuration
├── nativewind-env.d.ts         # NativeWind TypeScript definitions
├── output.css                  # Compiled Tailwind CSS
├── package.json                # Dependencies and scripts
├── tailwind.config.js          # Tailwind/NativeWind configuration
└── tsconfig.json               # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [pnpm](https://pnpm.io/) (recommended) or npm
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- iOS Simulator (Mac) or Android Emulator
- [Supabase](https://supabase.com/) account (for backend)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Maxamed-Maxamed/app_dogwalker.git
   cd app_dogwalker
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   See [Environment Variables](#-environment-variables) for required values.

4. **Build CSS** (first time only)

   ```bash
   pnpm build:css
   ```

5. **Start the development server**

   ```bash
   pnpm start
   ```

6. **Run on your device**
   - Press `a` for Android emulator
   - Press `i` for iOS simulator
   - Press `w` for web browser
   - Scan QR code with [Expo Go](https://expo.dev/go) app

## 🔐 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Optional: Stripe (for payments)
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Optional: Maps API
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-key
```

> **Note:** All public environment variables must be prefixed with `EXPO_PUBLIC_` to be accessible in the app.

## 🔄 Development Workflow

### Daily Development

```bash
# Start development server
pnpm start

# Run on specific platform
pnpm android    # Android emulator
pnpm ios        # iOS simulator
pnpm web        # Web browser
```

### Code Quality Checks

```bash
# Run ESLint
pnpm lint

# Run Qlty checks (local)
qlty check --all

# Auto-format code
qlty fmt --all
```

### Building CSS

```bash
# Build Tailwind CSS manually (also runs automatically via prestart hook when running pnpm start)
pnpm build:css
```

> **Note:** The `prestart` script in `package.json` automatically runs `build:css` before `pnpm start`. Run manually only if you need to rebuild CSS without restarting the dev server.

## 🎨 Styling with NativeWind

This project uses **NativeWind v4** for styling with Tailwind CSS classes:

```tsx
import { View, Text, Pressable } from "react-native";

export default function Button() {
  return (
    <Pressable className="bg-primary-500 rounded-xl p-4 active:bg-primary-600">
      <Text className="text-white font-semibold text-center">Book a Walk</Text>
    </Pressable>
  );
}
```

### Custom Theme Colors

The app includes custom color palettes defined in `tailwind.config.js`:

| Color        | Purpose                        |
| ------------ | ------------------------------ |
| `primary`    | Blue tones for primary actions |
| `secondary`  | Green tones for success states |
| `accent`     | Purple tones for highlights    |
| `text`       | Theme-aware text colors        |
| `background` | Theme-aware background colors  |
| `tint`       | Theme-aware accent colors      |
| `muted`      | Subdued text and elements      |
| `border`     | Theme-aware border colors      |

### Role-Specific Themes

- **Owner Theme** (`constants/owner-colors.ts`): Blue/Teal palette
- **Walker Theme** (`constants/walker-colors.ts`): Green/Orange palette

## 🧪 Code Quality

This project uses multiple tools for automated code quality and security analysis:

### Codacy (Cloud)

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/1d32d9d298b3460c8f9da3210f12bdd7)](https://app.codacy.com/gh/Maxamed-Maxamed/app_dogwalker/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

Cloud-based code quality analysis with support for multiple languages and security scanning.

### Qlty CLI (Local)

Local code quality toolkit with 10 plugins enabled:

| Plugin         | Purpose                          |
| -------------- | -------------------------------- |
| `eslint`       | JavaScript/TypeScript linting    |
| `prettier`     | Code formatting                  |
| `semgrep`      | Security analysis (SAST)         |
| `trivy`        | Vulnerability scanning           |
| `trufflehog`   | Secret detection                 |
| `gitleaks`     | Credential scanning              |
| `osv-scanner`  | Dependency vulnerability scanner |
| `radarlint-js` | JavaScript code quality          |
| `shellcheck`   | Shell script linting             |
| `ripgrep`      | TODO/NOTE comment detection      |

#### Qlty Commands

```bash
# Install Qlty CLI (Windows)
powershell -c "iwr https://qlty.sh | iex"

# Install Qlty CLI (macOS/Linux)
curl https://qlty.sh | bash

# Run all checks
qlty check --all

# Auto-format code
qlty fmt --all

# Run specific plugin
qlty check --all --filter=trivy

# Show code metrics
qlty metrics
```

<<<<<<< HEAD
> **Security Note:** The install commands above pipe remote scripts directly to a shell. Before running, review the installer at [qlty.sh](https://qlty.sh). For CI/CD pipelines, prefer pinned release URLs, checksum verification, or package managers for reproducible and auditable installs.


=======
>>>>>>> d034f20a1117d04ff7705486b25c8f46ecc2edbb
## 🤖 AI Development Tools

This project includes AI-assisted development configurations:

### GitHub Copilot Agents

Located in `.github/agents/`:

- **skills.agent.md** - Defines AI agent capabilities for code assistance

### AI Prompts

Located in `.github/prompts/`:

- **DOG_WALKER_APP_RESEARCH.prompt.md** - Research prompts for app development
- **Dog_Walker_App.prompt.md** - Main app development prompts
- **expertofapp.prompt.md** - Expert-level guidance prompts

### Project Specifications

Located in `.github/spec/`:

- **CodeArchitecture.prompt.md** - Architecture guidelines
- **spec-sheet.prompt.md** - Detailed project specifications

### MCP Server Configuration

VS Code MCP configuration in `.vscode/mcp.json` for enhanced AI tooling integration.

## 📄 Scripts

| Command              | Description                   |
| -------------------- | ----------------------------- |
| `pnpm start`         | Start Expo development server |
| `pnpm android`       | Run on Android emulator       |
| `pnpm ios`           | Run on iOS simulator          |
| `pnpm web`           | Run in web browser            |
| `pnpm lint`          | Run ESLint                    |
| `pnpm build:css`     | Build Tailwind CSS            |
| `pnpm reset-project` | Reset to fresh project state  |

## 🔧 Troubleshooting

### Common Issues

**Metro bundler cache issues:**

```bash
npx expo start --clear
```

**NativeWind styles not applying:**

```bash
pnpm build:css
npx expo start --clear
```

**TypeScript errors after package updates:**

```bash
rm -rf node_modules
pnpm install
```

**Expo Go not connecting:**

- Ensure your device and computer are on the same network
- Try using tunnel mode: `npx expo start --tunnel`

**Android emulator not starting:**

```bash
# Check available emulators
emulator -list-avds

# Start specific emulator
emulator -avd <avd_name>
```

## 🤝 Contributing

Contributions are welcome! Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before participating.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Run code quality checks:
   ```bash
   pnpm lint
   qlty check --all
   ```
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use NativeWind for styling (avoid inline styles)
- Write accessible components (WCAG compliant)
- Add proper error handling
- Test on both iOS and Android

## 🔐 Security

For information about reporting security vulnerabilities, please see our [Security Policy](SECURITY.md).

This project uses automated security scanning with:

- **Semgrep** - Static Application Security Testing (SAST)
- **Trivy** - Container and dependency vulnerability scanning
- **TruffleHog** - Secret detection in code and git history
- **Gitleaks** - Credential and API key scanning
- **OSV-Scanner** - Open-Source Vulnerability scanning

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📚 Documentation

| Document                              | Description                        |
| ------------------------------------- | ---------------------------------- |
| [Code of Conduct](CODE_OF_CONDUCT.md) | Community guidelines and standards |
| [Security Policy](SECURITY.md)        | How to report vulnerabilities      |
| [License](LICENSE)                    | MIT License terms                  |

## 🙏 Acknowledgments

- [Expo](https://expo.dev) for the amazing React Native framework
- [NativeWind](https://www.nativewind.dev/) for bringing Tailwind CSS to React Native
- [Supabase](https://supabase.com/) for the backend infrastructure
- [Qlty](https://qlty.sh/) for the comprehensive code quality toolkit
- [Codacy](https://www.codacy.com/) for automated code review

---

<p align="center">
  Made with ❤️ for dogs and their humans
</p>
