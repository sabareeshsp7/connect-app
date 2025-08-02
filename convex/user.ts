import { v } from "convex/values";
import { internalMutation, internalQuery, query, mutation } from "./_generated/server";
import { getUserByClerkId, generateUniqueUsername } from "./_utils";

export const create = internalMutation({
  args: {
    username: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    phoneNumber: v.optional(v.string()),
    authProviders: v.optional(v.array(v.string())),
    emailVerified: v.optional(v.boolean()),
    phoneVerified: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    // Check if user already exists using the safer getUserByClerkId function
    const existingUser = await getUserByClerkId({
      ctx,
      clerkId: args.clerkId,
    });

    if (existingUser) {
      // Ensure username is unique when updating
      let uniqueUsername = args.username;
      if (existingUser.username !== args.username) {
        uniqueUsername = await generateUniqueUsername({
          ctx,
          baseUsername: args.username,
          excludeClerkId: args.clerkId,
        });
      }

      // Update existing user with new information
      await ctx.db.patch(existingUser._id, {
        username: uniqueUsername,
        imageUrl: args.imageUrl,
        email: args.email,
        firstName: args.firstName,
        lastName: args.lastName,
        phoneNumber: args.phoneNumber,
        authProviders: args.authProviders,
        emailVerified: args.emailVerified,
        phoneVerified: args.phoneVerified,
        updatedAt: now,
        lastLoginAt: now,
      });
      return existingUser._id;
    } else {
      // Generate unique username for new user
      const uniqueUsername = await generateUniqueUsername({
        ctx,
        baseUsername: args.username,
      });

      // Create new user
      return await ctx.db.insert("users", {
        ...args,
        username: uniqueUsername,
        profileComplete: !!(args.firstName && args.lastName),
        preferences: {
          theme: "system",
          notifications: true,
          language: "en",
        },
        createdAt: now,
        updatedAt: now,
        lastLoginAt: now,
      });
    }
  },
});

export const get = internalQuery({
  args: { clerkId: v.string() },
  async handler(ctx, args) {
    return await getUserByClerkId({
      ctx,
      clerkId: args.clerkId,
    });
  },
});

export const getByEmail = internalQuery({
  args: { email: v.string() },
  async handler(ctx, args) {
    return ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();
  },
});

export const getByPhone = internalQuery({
  args: { phoneNumber: v.string() },
  async handler(ctx, args) {
    return ctx.db
      .query("users")
      .withIndex("by_phoneNumber", (q) => q.eq("phoneNumber", args.phoneNumber))
      .unique();
  },
});

export const updateAuthProviders = internalMutation({
  args: {
    clerkId: v.string(),
    provider: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await getUserByClerkId({
      ctx,
      clerkId: args.clerkId,
    });

    if (user) {
      const currentProviders = user.authProviders || [];
      const updatedProviders = currentProviders.includes(args.provider)
        ? currentProviders
        : [...currentProviders, args.provider];

      await ctx.db.patch(user._id, {
        authProviders: updatedProviders,
        updatedAt: Date.now(),
        lastLoginAt: Date.now(),
      });
    }
  },
});

export const updateProfile = mutation({
  args: {
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    username: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    preferences: v.optional(v.object({
      theme: v.optional(v.string()),
      notifications: v.optional(v.boolean()),
      language: v.optional(v.string()),
    })),
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

    const updateData: any = {
      updatedAt: Date.now(),
    };

    if (args.firstName !== undefined) updateData.firstName = args.firstName;
    if (args.lastName !== undefined) updateData.lastName = args.lastName;
    if (args.imageUrl !== undefined) updateData.imageUrl = args.imageUrl;
    
    // Handle username update with uniqueness check
    if (args.username !== undefined && args.username !== user.username) {
      const uniqueUsername = await generateUniqueUsername({
        ctx,
        baseUsername: args.username,
        excludeClerkId: identity.subject,
      });
      updateData.username = uniqueUsername;
    }
    
    if (args.preferences !== undefined) {
      updateData.preferences = {
        ...user.preferences,
        ...args.preferences,
      };
    }

    // Update profile completion status
    updateData.profileComplete = !!(
      (args.firstName || user.firstName) && 
      (args.lastName || user.lastName)
    );

    await ctx.db.patch(user._id, updateData);
    return user._id;
  },
});

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    return await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });
  },
});

export const searchUsers = query({
  args: {
    searchTerm: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    if (args.searchTerm.length < 2) {
      return [];
    }

    return await ctx.db
      .query("users")
      .withSearchIndex("search_username", (q) => q.search("username", args.searchTerm))
      .take(10);
  },
});
