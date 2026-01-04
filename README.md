# 🐕 DogWalker

A dual-role mobile application for iOS and Android that connects **Dog Owners** with trusted **Dog Walkers**. Find, book, and track dog walking services in real-time.

![Expo](https://img.shields.io/badge/Expo-54-000020?style=flat-square&logo=expo)
![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB?style=flat-square&logo=react)
![NativeWind](https://img.shields.io/badge/NativeWind-4.2-06B6D4?style=flat-square&logo=tailwindcss)
![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20DB-3FCF8E?style=flat-square&logo=supabase)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)

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

## 🛠️ Tech Stack

| Category | Technology |
| ---------- | ------------ |
| **Framework** | [Expo](https://expo.dev) (React Native) |
| **Routing** | [Expo Router](https://docs.expo.dev/router/introduction/) |
| **Styling** | [NativeWind](https://www.nativewind.dev/) v4 (Tailwind CSS) |
| **State Management** | [Zustand](https://zustand-demo.pmnd.rs/) + [TanStack Query](https://tanstack.com/query) |
| **Forms** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| **Database/Auth** | [Supabase](https://supabase.com/) |
| **Maps** | [Expo Maps](https://docs.expo.dev/versions/latest/sdk/maps/) |

## 📁 Project Structure

 ``` bash
Dogwalker/
├── app/                    # Expo Router (file-based routing)
│   ├── _layout.tsx         # Root layout with providers
│   ├── (tabs)/             # Tab navigation
│   │   ├── index.tsx       # Home screen
│   │   └── explore.tsx     # Explore screen
│   ├── (auth)/             # Authentication flow
│   ├── (owner)/            # Dog Owner screens
│   ├── (walker)/           # Dog Walker screens
│   └── (shared)/           # Shared screens (chat, profile, settings)
├── components/             # Reusable UI components
├── constants/              # Theme and configuration
├── hooks/                  # Custom React hooks
├── assets/                 # Images, icons, fonts
├── global.css              # Tailwind CSS directives
├── tailwind.config.js      # Tailwind/NativeWind configuration
└── babel.config.js         # Babel configuration
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [pnpm](https://pnpm.io/) (recommended) or npm
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- iOS Simulator (Mac) or Android Emulator

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

   Then add your Supabase and API keys to `.env.local`

4. **Start the development server**

   ```bash
   pnpm start
   ```

5. **Run on your device**
   - Press `a` for Android emulator
   - Press `i` for iOS simulator
   - Press `w` for web browser
   - Scan QR code with [Expo Go](https://expo.dev/go) app

## 📱 Screenshots

| Home | Find Walker | Live Tracking |
| ---------- | ------------ | --------------- |
| 🏠 | 🔍 | 📍 |

## 🎨 Styling with NativeWind

This project uses **NativeWind v4** for styling with Tailwind CSS classes:

```tsx
import { View, Text, Pressable } from 'react-native';

export default function Button() {
  return (
    <Pressable className="bg-primary-500 rounded-xl p-4 active:bg-primary-600">
      <Text className="text-white font-semibold text-center">
        Book a Walk
      </Text>
    </Pressable>
  );
}
```

### Custom Theme Colors

The app includes custom color palettes defined in `tailwind.config.js`:

- `primary` - Blue tones for primary actions
- `secondary` - Green tones for success states
- `accent` - Purple tones for highlights

## 🧪 Code Quality

This project uses [Codacy](https://www.codacy.com/) for automated code quality analysis.

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/your-project-id)](https://app.codacy.com/gh/Maxamed-Maxamed/app_dogwalker/dashboard)

## 📄 Scripts

| Command | Description |
| -------------- | -----------|-------------|
| `pnpm start` | Start Expo development server |
| `pnpm android` | Run on Android emulator |
| `pnpm ios` | Run on iOS simulator |
| `pnpm web` | Run in web browser |
| `pnpm lint` | Run ESLint |
| `pnpm reset-project` | Reset to fresh project |

## 🤝 Contributing

Contributions are welcome! Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before participating in this project.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🔐 Security

For information about reporting security vulnerabilities, please see our [Security Policy](SECURITY.md).

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📚 Documentation

| Document | Description |
| ---------- | ------------------------ |
| [Code of Conduct](CODE_OF_CONDUCT.md) | Community guidelines and standards |
| [Security Policy](SECURITY.md) | How to report vulnerabilities |
| [License](LICENSE) | MIT License terms |

## 🙏 Acknowledgments

- [Expo](https://expo.dev) for the amazing React Native framework
- [NativeWind](https://www.nativewind.dev/) for bringing Tailwind CSS to React Native
- [Supabase](https://supabase.com/) for the backend infrastructure

---

<!-- markdownlint-disable-next-line MD033 -->
<p style="text-align: center; font-size: 14px;">
  Made with ❤️ for dogs and their humans
</p>
