import { internalMutation } from "./_generated/server";

// This is a one-time cleanup function to remove duplicate users
// Run this function once to clean up any existing duplicates
export const cleanupDuplicateUsers = internalMutation({
  args: {},
  handler: async (ctx) => {
    console.log("Starting cleanup of duplicate users...");
    
    // Get all users
    const allUsers = await ctx.db.query("users").collect();
    
    // Group users by clerkId
    const usersByClerkId = new Map<string, any[]>();
    
    for (const user of allUsers) {
      if (!usersByClerkId.has(user.clerkId)) {
        usersByClerkId.set(user.clerkId, []);
      }
      usersByClerkId.get(user.clerkId)!.push(user);
    }
    
    let duplicatesFound = 0;
    let duplicatesRemoved = 0;
    
    // Process each group of users with the same clerkId
    for (const [clerkId, users] of Array.from(usersByClerkId.entries())) {
      if (users.length > 1) {
        duplicatesFound += users.length - 1;
        console.log(`Found ${users.length} users with clerkId: ${clerkId}`);
        
        // Sort by most recent (updatedAt, then createdAt, then _creationTime)
        const sortedUsers = users.sort((a, b) => {
          const aTime = a.updatedAt || a.createdAt || a._creationTime;
          const bTime = b.updatedAt || b.createdAt || b._creationTime;
          return bTime - aTime;
        });
        
        // Keep the most recent user, delete the rest
        const userToKeep = sortedUsers[0];
        const usersToDelete = sortedUsers.slice(1);
        
        console.log(`Keeping user ${userToKeep._id} for clerkId ${clerkId}`);
        
        for (const userToDelete of usersToDelete) {
          console.log(`Deleting duplicate user ${userToDelete._id}`);
          await ctx.db.delete(userToDelete._id);
          duplicatesRemoved++;
        }
      }
    }
    
    // Check for duplicate usernames and make them unique
    const usersByUsername = new Map<string, any[]>();
    const remainingUsers = await ctx.db.query("users").collect();
    
    for (const user of remainingUsers) {
      if (!usersByUsername.has(user.username)) {
        usersByUsername.set(user.username, []);
      }
      usersByUsername.get(user.username)!.push(user);
    }
    
    let usernameConflicts = 0;
    
    for (const [username, users] of Array.from(usersByUsername.entries())) {
      if (users.length > 1) {
        console.log(`Found ${users.length} users with username: ${username}`);
        
        // Sort by creation time, keep the first one with original username
        const sortedUsers = users.sort((a, b) => {
          const aTime = a.createdAt || a._creationTime;
          const bTime = b.createdAt || b._creationTime;
          return aTime - bTime;
        });
        
        // Update usernames for duplicates
        for (let i = 1; i < sortedUsers.length; i++) {
          const newUsername = `${username}${i}`;
          console.log(`Updating username from ${username} to ${newUsername} for user ${sortedUsers[i]._id}`);
          
          await ctx.db.patch(sortedUsers[i]._id, {
            username: newUsername,
            updatedAt: Date.now(),
          });
          
          usernameConflicts++;
        }
      }
    }
    
    console.log(`Cleanup completed:
      - Duplicate users found: ${duplicatesFound}
      - Duplicate users removed: ${duplicatesRemoved}
      - Username conflicts resolved: ${usernameConflicts}
    `);
    
    return {
      duplicatesFound,
      duplicatesRemoved,
      usernameConflicts,
      message: "Cleanup completed successfully"
    };
  },
});
