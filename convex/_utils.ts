import { MutationCtx, QueryCtx } from "./_generated/server";

export const getUserByClerkId = async ({
  ctx,
  clerkId,
}: {
  ctx: QueryCtx | MutationCtx;
  clerkId: string;
}) => {
  // Handle potential duplicates by getting the first result
  // This is a safety measure while we clean up any existing duplicates
  const users = await ctx.db
    .query("users")
    .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
    .collect();
  
  if (users.length === 0) {
    return null;
  }
  
  if (users.length > 1) {
    console.warn(`Found ${users.length} users with clerkId ${clerkId}. Using the most recent one.`);
    // Return the most recently updated user
    return users.sort((a, b) => (b.updatedAt || b.createdAt || 0) - (a.updatedAt || a.createdAt || 0))[0];
  }
  
  return users[0];
};

// Safe authentication handler that returns user or null without throwing
export const getCurrentUser = async (ctx: QueryCtx | MutationCtx) => {
  try {
    const identity = await ctx.auth.getUserIdentity();
    
    if (!identity) {
      return null;
    }

    const user = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });

    return user;
  } catch (error) {
    console.warn("Authentication error:", error);
    return null;
  }
};

// Helper function to check if username is unique
export const isUsernameUnique = async ({
  ctx,
  username,
  excludeClerkId,
}: {
  ctx: QueryCtx | MutationCtx;
  username: string;
  excludeClerkId?: string;
}) => {
  const existingUser = await ctx.db
    .query("users")
    .withIndex("by_username", (q) => q.eq("username", username))
    .first();
  
  // If no user found with this username, it's unique
  if (!existingUser) {
    return true;
  }
  
  // If we're excluding a specific clerkId (for updates), check if it's the same user
  if (excludeClerkId && existingUser.clerkId === excludeClerkId) {
    return true;
  }
  
  return false;
};

// Helper function to generate unique username
export const generateUniqueUsername = async ({
  ctx,
  baseUsername,
  excludeClerkId,
}: {
  ctx: QueryCtx | MutationCtx;
  baseUsername: string;
  excludeClerkId?: string;
}) => {
  let username = baseUsername;
  let counter = 1;
  
  while (!(await isUsernameUnique({ ctx, username, excludeClerkId }))) {
    username = `${baseUsername}${counter}`;
    counter++;
    
    // Safety check to prevent infinite loops
    if (counter > 1000) {
      username = `${baseUsername}${Date.now()}`;
      break;
    }
  }
  
  return username;
};
