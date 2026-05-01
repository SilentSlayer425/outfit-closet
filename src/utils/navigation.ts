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

const ROOT_HOSTS = new Set(['outfitcanvas.com', 'www.outfitcanvas.com']);

function isRootHost(hostname: string) {
  return ROOT_HOSTS.has(hostname);
}

function isProdHost(hostname: string) {
  return hostname.endsWith('outfitcanvas.com');
}

/** Navigate to a subdomain on prod, or fall back to path routing in dev/root */
export function goToSubdomain(subdomain: string) {
  const hostname = window.location.hostname;
  const path = SUBDOMAIN_PATHS[subdomain] ?? '/';
  const isProd = isProdHost(hostname);
  const isRoot = isRootHost(hostname);

  if (!isProd || isRoot) {
    window.location.href = path;
    return;
  }

  window.location.href = `https://${subdomain}.outfitcanvas.com`;
}
