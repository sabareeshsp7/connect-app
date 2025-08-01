/**
 * Utility functions for handling URLs in both development and production environments
 */

export function getBaseUrl(): string {
  // For client-side, use relative URLs
  if (typeof window !== 'undefined') {
    return '';
  }
  
  // For production deployment
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  
  // For Vercel deployments
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // For development
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function getAbsoluteUrl(path: string): string {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const baseUrl = getBaseUrl();
  
  return baseUrl ? `${baseUrl}/${cleanPath}` : `/${cleanPath}`;
}

export function getRedirectUrl(path: string): string {
  // In development, return relative URL
  if (process.env.NODE_ENV === 'development') {
    return path;
  }
  
  // In production, return absolute URL
  return getAbsoluteUrl(path);
}
