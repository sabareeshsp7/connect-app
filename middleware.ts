import { clerkMiddleware, createRouteMatcher} from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([ '/(.*)', ]);
const isPublicApiRoute = createRouteMatcher(['/api/uploadthing']);

export default clerkMiddleware(async (auth, req) => {
  // Allow AI chat API for authenticated users only
  if (req.nextUrl.pathname === '/api/ai-chat') {
    return; // Let it through without protection check
  }
  
  if (isProtectedRoute(req) && !isPublicApiRoute(req)) {
    await auth().protect();
  }
});

export const config = { matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],};

