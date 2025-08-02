# Database Migration Guide

## Overview
This migration enhances the user authentication system to support multiple authentication providers while maintaining user profile consistency through Clerk's automatic account linking.

## Recent Fixes

### ✅ **Fixed "Unauthorized" Runtime Errors**
- **Problem**: Query functions were throwing "Unauthorized" errors when user wasn't signed in, causing app crashes
- **Solution**: Made query functions defensive by returning empty arrays/default values instead of throwing errors
- **Files Updated**: `requests.tsx`, `conversations.tsx`, `friends.ts`, `messages.ts`

### ✅ **Fixed Duplicate User Issues**
- **Problem**: `unique()` queries were failing due to duplicate users with same clerkId
- **Solution**: Enhanced `getUserByClerkId` to handle duplicates gracefully
- **Added**: Cleanup function to remove existing duplicates

### ✅ **Enhanced Authentication Utilities**
- **Added**: `getCurrentUser` utility for safe authentication checks
- **Added**: `debugAuth` query to troubleshoot authentication issues
- **Added**: Username uniqueness enforcement

## Changes Made

### 1. Enhanced User Schema (`convex/schema.ts`)
- Added `firstName`, `lastName`, `phoneNumber` fields
- Added `authProviders` array to track authentication methods used
- Added verification status fields (`emailVerified`, `phoneVerified`)
- Added user preferences and timestamps
- Added search index for username search
- Added phone number index for phone-based authentication
- **Added username index for uniqueness checks**

### 2. Enhanced User Functions (`convex/user.ts`)
- Updated `create` function to handle multiple auth providers
- Added profile management functions
- Added search capabilities
- Enhanced user update logic with proper merging
- **Added username uniqueness validation**

### 3. New User Profile Management (`convex/userProfile.ts`)
- Profile completion tracking
- User preferences management
- Authentication provider information
- User statistics and analytics

### 4. Enhanced Webhook Handler (`convex/http.ts`)
- Better extraction of authentication provider information from Clerk
- Support for multiple account types (Google, GitHub, email, phone, username)
- Improved user data handling

### 5. **New Defensive Query Pattern**
Query functions now handle authentication gracefully:

```typescript
// Before (would crash app)
if (!identity) {
  throw new Error("Unauthorized");
}

// After (graceful handling)
if (!identity) {
  return []; // or appropriate default value
}
```

### 6. **New Utilities (`convex/_utils.ts`)**
- `getCurrentUser`: Safe authentication check
- `getUserByClerkId`: Handles duplicates gracefully
- `generateUniqueUsername`: Ensures username uniqueness
- `isUsernameUnique`: Checks username availability

### 7. **Debug Tools (`convex/debug.ts`)**
- `debugAuth`: Troubleshoot authentication issues
- Returns detailed authentication state information

## Authentication Providers Supported

1. **Google OAuth** - via `oauth_google`
2. **GitHub OAuth** - via `oauth_github`  
3. **Email/Password** - via email authentication
4. **Phone/SMS** - via phone number authentication
5. **Username/Password** - via username authentication

## Clerk Configuration Required

You'll need to enable these authentication methods in your Clerk Dashboard:

1. Go to https://dashboard.clerk.com
2. Select your application
3. Navigate to "User & Authentication" > "Social Connections"
4. Enable Google and GitHub OAuth
5. Navigate to "User & Authentication" > "Email, Phone, Username"
6. Enable the authentication methods you want to support

## Environment Variables

Make sure these are set in your `.env.local`:

```env
# Existing
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_secret
CLERK_WEBHOOK_SECRET=your_webhook_secret

# New (if using phone authentication)
CLERK_PHONE_NUMBERS_ENABLED=true
```

## How Account Linking Works

Clerk automatically links accounts that share the same verified email address:

1. User signs up with Google (email: user@example.com)
2. Later, user signs in with GitHub (same email: user@example.com)
3. Clerk automatically links these accounts
4. Our webhook receives the update and adds both providers to `authProviders` array
5. User maintains single profile with access via multiple authentication methods

## Troubleshooting

### Check Authentication Status
Run this query in your Convex dashboard or via API:
```typescript
await convex.query("debug:debugAuth");
```

This will return:
- `NO_IDENTITY`: User not signed in
- `NO_USER_RECORD`: Signed in but no database record
- `SUCCESS`: Everything working
- `ERROR`: Authentication error occurred

### Common Issues & Solutions

1. **"Unauthorized" Errors**: 
   - ✅ Fixed by making queries defensive
   - Queries now return empty arrays instead of throwing errors

2. **Duplicate Users**:
   - ✅ Run cleanup: `npx convex run cleanup:cleanupDuplicateUsers`
   - Enhanced `getUserByClerkId` handles duplicates automatically

3. **Username Conflicts**:
   - ✅ System automatically generates unique usernames
   - Adds numbers to make duplicates unique (e.g., "john1", "john2")

## Database Migration (Development)

Since you're in development, the new schema will be applied automatically when you:

1. Deploy the updated Convex functions
2. Run `npx convex dev` or `npx convex deploy`
3. Existing users will be migrated automatically via the webhook when they next sign in

## Testing the Changes

1. Test Google authentication (existing)
2. Enable and test GitHub authentication
3. Test email/password authentication
4. Test phone authentication (if enabled)
5. Test username/password authentication
6. Verify that users can sign in with multiple methods and maintain the same profile
7. **Test that app doesn't crash when user is not signed in**

## User Experience Flow

1. **New User**: Chooses any authentication method → Profile created
2. **Existing User**: Signs in with new method → Clerk links accounts → Profile updated with new provider
3. **Profile Management**: Users can see all linked authentication methods in their profile
4. **Account Security**: Users can see when they last signed in and which methods they've used
5. **Graceful Handling**: App continues to work even when authentication fails

This system ensures that users never lose their data when switching between authentication methods, and the app remains stable even during authentication issues.
