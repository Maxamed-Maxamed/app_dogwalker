# # 1. What This App Does

1.What This App Does

-DogWalker is a mobile app for iOS and Android that helps pet owners find, book, and track trusted local dog walkers. Compare options, schedule and pay, then follow the walk live and get a detailed summary.

2.Core Features
-Find a Walker: Search and compare local walkers by detailed profiles, reviews, and background-check status; message securely to vet options. Custom implementation on Expo with Supabase-authenticated users and Supabase storing profiles, reviews, and messages.
-Book a Walk: Choose service type and duration, pick date/time and walker, complete payment, and get confirmations with easy cancellation or rescheduling. Custom booking and payment flow in Expo; bookings, transactions, and receipts are persisted in Supabase and scoped by Supabase user accounts.
-Live Walk Tracking: Start a walk to share real-time GPS route, status updates, photos, and timestamps, then deliver a post-walk summary. Custom tracking using device GPS via Expo APIs, with live data synced through Supabase real-time queries to the owner’s view, gated by Supabase authentication.

3.Tech Stack
-Framework: Expo (React Native)
-Database/Realtime: Supabase
-Auth: Supabase

4.UI Design Style
Modern, clean, intuitive UI without being flashy.
