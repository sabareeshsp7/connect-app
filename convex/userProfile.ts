import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getUserByClerkId } from "./_utils";

// Get user profile with authentication provider information
export const getUserProfile = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    const user = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });

    if (!user) {
      return null;
    }

    return {
      ...user,
      // Calculate profile completion percentage
      profileCompletionPercentage: calculateProfileCompletion(user),
    };
  },
});

// Update user preferences
export const updateUserPreferences = mutation({
  args: {
    theme: v.optional(v.string()),
    notifications: v.optional(v.boolean()),
    language: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const user = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });

    if (!user) {
      throw new Error("User not found");
    }

    const updatedPreferences = {
      ...user.preferences,
      ...args,
    };

    await ctx.db.patch(user._id, {
      preferences: updatedPreferences,
      updatedAt: Date.now(),
    });

    return updatedPreferences;
  },
});

// Get authentication providers for current user
export const getAuthProviders = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    const user = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });

    return user?.authProviders || [];
  },
});

// Mark profile as complete
export const completeProfile = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    username: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const user = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });

    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.patch(user._id, {
      firstName: args.firstName,
      lastName: args.lastName,
      username: args.username || user.username,
      profileComplete: true,
      updatedAt: Date.now(),
    });

    return true;
  },
});

// Helper function to calculate profile completion
function calculateProfileCompletion(user: any): number {
  const fields = [
    user.firstName,
    user.lastName,
    user.email,
    user.username,
    user.imageUrl,
  ];

  const completedFields = fields.filter(field => field && field.trim() !== '').length;
  return Math.round((completedFields / fields.length) * 100);
}

// Get user statistics
export const getUserStats = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    const user = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });

    if (!user) {
      return null;
    }

    // Get conversation count
    const conversations = await ctx.db
      .query("conversationMembers")
      .withIndex("by_memberId", (q) => q.eq("memberId", user._id))
      .collect();

    // Get message count
    const messages = await ctx.db
      .query("messages")
      .filter((q) => q.eq(q.field("senderId"), user._id))
      .collect();

    // Get friend count
    const friends1 = await ctx.db
      .query("friends")
      .withIndex("by_user1", (q) => q.eq("user1", user._id))
      .collect();

    const friends2 = await ctx.db
      .query("friends")
      .withIndex("by_user2", (q) => q.eq("user2", user._id))
      .collect();

    return {
      conversationCount: conversations.length,
      messageCount: messages.length,
      friendCount: friends1.length + friends2.length,
      profileCompletionPercentage: calculateProfileCompletion(user),
      authProviders: user.authProviders || [],
      memberSince: user.createdAt || Date.now(),
      lastActive: user.lastLoginAt || user.updatedAt || user.createdAt,
    };
  },
});
