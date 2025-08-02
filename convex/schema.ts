import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
  users: defineTable({
    username: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
    email: v.string(),
    // Additional fields for enhanced profile management
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    phoneNumber: v.optional(v.string()),
    // Track authentication providers used
    authProviders: v.optional(v.array(v.string())), // ["google", "github", "email", "phone", "username"]
    // Profile completion and verification status
    emailVerified: v.optional(v.boolean()),
    phoneVerified: v.optional(v.boolean()),
    profileComplete: v.optional(v.boolean()),
    // User preferences and settings
    preferences: v.optional(v.object({
      theme: v.optional(v.string()),
      notifications: v.optional(v.boolean()),
      language: v.optional(v.string()),
    })),
    // Timestamps for better user management
    createdAt: v.optional(v.number()),
    updatedAt: v.optional(v.number()),
    lastLoginAt: v.optional(v.number()),
  })
    .index("by_email", ["email"])
    .index("by_clerkId", ["clerkId"])
    .index("by_phoneNumber", ["phoneNumber"])
    .index("by_username", ["username"]) // Add username index for uniqueness checks
    .searchIndex("search_username", {
      searchField: "username",
      filterFields: ["email"]
    }),
  requests: defineTable({
    sender: v.id("users"),
    receiver: v.id("users"),
  })
    .index("by_receiver", ["receiver"])
    .index("by_receiver_sender", ["receiver", "sender"]),
  friends: defineTable({
    user1: v.id("users"),
    user2: v.id("users"),
    conversationId: v.id("conversations"),
  })
    .index("by_user1", ["user1"])
    .index("by_user2", ["user2"])
    .index("by_conversationId", ["conversationId"]),
  conversations: defineTable({
    name: v.optional(v.string()),
    isGroup: v.boolean(),
    lastMessageId: v.optional(v.id("messages")),
  }),
  conversationMembers: defineTable({
    memberId: v.id("users"),
    conversationId: v.id("conversations"),
    lastSeenMessage: v.optional(v.id("messages")),
  })
    .index("by_memberId", ["memberId"])
    .index("by_conversationId", ["conversationId"])
    .index("by_memberId_conversationId", ["memberId", "conversationId"]),
  messages: defineTable({
    senderId: v.id("users"),
    conversationId: v.id("conversations"),
    type: v.string(),
    content: v.array(v.string()),
    replyToMessageId: v.optional(v.id("messages")),
    replyToSenderName: v.optional(v.string()),
    replyToContent: v.optional(v.string()),
  }).index("by_conversationId", ["conversationId"]),
});
