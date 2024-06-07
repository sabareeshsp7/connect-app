import { clerkMiddleware, createRouteMatcher} from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([ '/(.*)', ]);

export default clerkMiddleware((auth, req) =>
{
     if (isProtectedRoute(req)) auth().protect();
     publicRoutes: ["app/api/uploadthing"]


}
);



export const config = { matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],};