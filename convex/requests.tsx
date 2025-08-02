import { ConvexError } from "convex/values";
import { getUserByClerkId } from "./_utils";
import { query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    // Return empty array if user is not authenticated
    if (!identity) {
      return [];
    }

    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });

    // Return empty array if user not found
    if (!currentUser) {
      return [];
    }

    const requests = await ctx.db
      .query("requests")
      .withIndex("by_receiver", (q) => q.eq("receiver", currentUser._id))
      .collect();

    const requestsWithSender = await Promise.all(
      requests.map(async (request) => {
        const sender = await ctx.db.get(request.sender);

        if (!sender) {
          throw new ConvexError(`Request sender could not be found`);
        }

        return {
          sender,
          request,
        };
      })
    );

    return requestsWithSender;
  },
});

export const count = query({
  args: {},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    // Return 0 if user is not authenticated instead of throwing error
    if (!identity) {
      return 0;
    }

    const currentUser = await getUserByClerkId({
      ctx,
      clerkId: identity.subject,
    });

    // Return 0 if user not found instead of throwing error
    if (!currentUser) {
      return 0;
    }

    const requests = await ctx.db
      .query("requests")
      .withIndex("by_receiver", (q) => q.eq("receiver", currentUser._id))
      .collect();

    return requests.length;
  },
});
