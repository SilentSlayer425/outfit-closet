/**
 * navigation.ts
 * 
 * Shared subdomain navigation utility.
 * Import goToSubdomain anywhere in the app without circular deps.
 */

const SUBDOMAIN_PATHS: Record<string, string> = {
  home:    '/',
  login:   '/login',
  app:     '/app',
  builder: '/app?tab=builder',
  outfits: '/app?tab=outfits',
  donate:  '/donate',
  terms:   '/terms',
  privacy: '/privacy',
  delete:  '/delete',
};

/** Navigate to a subdomain on prod, or fall back to path routing in dev */
export function goToSubdomain(subdomain: string) {
  const isProd = window.location.hostname.includes('outfitcanvas.com');
  if (isProd) {
    window.location.href = `https://${subdomain}.outfitcanvas.com`;
  } else {
    const path = SUBDOMAIN_PATHS[subdomain] ?? '/';
    window.location.href = path;
  }
}
