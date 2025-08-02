import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import type { WebhookEvent } from "@clerk/backend";
import { Webhook } from "svix";

const validatePayload = async (
  req: Request
): Promise<WebhookEvent | undefined> => {
  const payload = await req.text();

  const svixHeaders = {
    "svix-id": req.headers.get("svix-id")!,
    "svix-timestamp": req.headers.get("svix-timestamp")!,
    "svix-signature": req.headers.get("svix-signature")!,
  };

  const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "");

  try {
    const event = webhook.verify(payload, svixHeaders) as WebhookEvent;

    return event;
  } catch (_) {
    console.error("Clerk webhook request could not be verified");
    return;
  }
};

const handleClerkWebhook = httpAction(async (ctx, req) => {
  const event = await validatePayload(req);

  if (!event) {
    return new Response("Could not validate Clerk payload", {
      status: 400,
    });
  }

  switch (event.type) {
    case "user.created":
    case "user.updated": {
      console.log("Creating/Updating User:", event.data.id);

      // Extract authentication providers from Clerk data
      const authProviders: string[] = [];
      if (event.data.external_accounts) {
        event.data.external_accounts.forEach((account: any) => {
          if (account.provider === "oauth_google") authProviders.push("google");
          if (account.provider === "oauth_github") authProviders.push("github");
        });
      }
      if (event.data.email_addresses && event.data.email_addresses.length > 0) {
        authProviders.push("email");
      }
      if (event.data.phone_numbers && event.data.phone_numbers.length > 0) {
        authProviders.push("phone");
      }
      if (event.data.username) {
        authProviders.push("username");
      }

      // Get primary email and phone
      const primaryEmail = event.data.email_addresses?.find((email: any) => email.id === event.data.primary_email_address_id);
      const primaryPhone = event.data.phone_numbers?.find((phone: any) => phone.id === event.data.primary_phone_number_id);

      // Create or update user with enhanced data
      await ctx.runMutation(internal.user.create, {
        username: event.data.username || `${event.data.first_name || ''} ${event.data.last_name || ''}`.trim() || primaryEmail?.email_address?.split('@')[0] || 'User',
        imageUrl: event.data.image_url || '',
        clerkId: event.data.id,
        email: primaryEmail?.email_address || '',
        firstName: event.data.first_name || '',
        lastName: event.data.last_name || '',
        phoneNumber: primaryPhone?.phone_number || '',
        authProviders,
        emailVerified: primaryEmail?.verification?.status === 'verified',
        phoneVerified: primaryPhone?.verification?.status === 'verified',
      });

      break;
    }
    case "session.created": {
      // Update last login time when user signs in
      await ctx.runMutation(internal.user.updateAuthProviders, {
        clerkId: event.data.user_id,
        provider: 'session_login',
      });

      break;
    }
    default: {
      console.log("Clerk webhook event not supported", event.type);
    }
  }
  return new Response(null, {
    status: 200,
  });
});

const http = httpRouter();

http.route({
  path: "/clerk-users-webhook",
  method: "POST",
  handler: handleClerkWebhook,
});

export default http;
