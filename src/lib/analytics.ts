/**
 * No-op event tracker. Analytics (GA4) was removed on 16 Nov 2026: the tag
 * was blocked by the site's Content Security Policy and never loaded, and
 * the site's promise is zero tracking. This function is kept so existing
 * call sites need no changes; it sends nothing anywhere.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars — signature kept for call-site compatibility.
export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  // Intentionally empty — no analytics, no network calls.
}
