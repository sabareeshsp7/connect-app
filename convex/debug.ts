import { query } from "./_generated/server";
import { getCurrentUser } from "./_utils";

// Debug query to check authentication state
export const debugAuth = query({
  args: {},
  handler: async (ctx) => {
    try {
      const identity = await ctx.auth.getUserIdentity();
      
      if (!identity) {
        return {
          status: "NO_IDENTITY",
          message: "No user identity found - user not signed in",
          identity: null,
          user: null,
        };
      }

      const user = await getCurrentUser(ctx);
      
      if (!user) {
        return {
          status: "NO_USER_RECORD",
          message: "User identity found but no user record in database",
          identity: {
            subject: identity.subject,
            email: identity.email,
            name: identity.name,
          },
          user: null,
        };
      }

      return {
        status: "SUCCESS",
        message: "User authenticated successfully",
        identity: {
          subject: identity.subject,
          email: identity.email,
          name: identity.name,
        },
        user: {
          id: user._id,
          clerkId: user.clerkId,
          username: user.username,
          email: user.email,
        },
      };
    } catch (error) {
      return {
        status: "ERROR",
        message: `Authentication error: ${error}`,
        identity: null,
        user: null,
      };
    }
  },
});
