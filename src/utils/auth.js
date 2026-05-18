import { DEV_FALLBACK_TOKEN } from '../config';

// ─── Internal timer ref ────────────────────────────────────────────────────
let _refreshTimer = null;

// ─── Session key constants ─────────────────────────────────────────────────
const TOKEN_KEY = 'appAccessToken';
const VALIDITY_KEY = 'validity';
const CREATED_AT_KEY = 'tokenCreatedAt';

// ──────────────────────────────────────────────────────────────────────────
// PRIVATE HELPERS
// ──────────────────────────────────────────────────────────────────────────

/**
 * Decodes a JWT payload (base64url → JSON) without any external library.
 * Returns the parsed object, or null if the token is malformed.
 */
const decodeJwtPayload = (token) => {
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
};

/**
 * Writes the three session keys + AppHub companion values to sessionStorage.
 * Reads validity by decoding the JWT — no separate parameter needed.
 */
const storeTokenInSession = (token) => {
  const payload = decodeJwtPayload(token);
  const validity = payload?.validity ?? 960;

  sessionStorage.setItem(TOKEN_KEY, token);
  sessionStorage.setItem(VALIDITY_KEY, String(validity));
  sessionStorage.setItem(CREATED_AT_KEY, String(Date.now()));
  sessionStorage.setItem('appHub', 'true');
  sessionStorage.setItem('appsBaseUrl', 'https://apphub.andritz.com/appsapi/');
};

/**
 * Arms (or re-arms) the auto-refresh timer at 80% of the stored validity.
 * e.g. 960 s validity → fires at 768 s.
 */
const scheduleTokenRefresh = () => {
  if (_refreshTimer) clearTimeout(_refreshTimer);
  const validity = Number(sessionStorage.getItem(VALIDITY_KEY)) || 960;
  const delay = validity * 0.8 * 1000;          // ms
  _refreshTimer = setTimeout(doRefreshToken, delay);
};

/**
 * Calls GET /refresh-token with the current Bearer token.
 *  - On success  → overwrites session keys + reschedules the timer.
 *  - On failure  → production: clears session + redirects to /login.
 *                  dev mode  : warns + re-seeds from DEV_FALLBACK_TOKEN
 *                              (avoids redirect loops while developing).
 */
const doRefreshToken = async () => {
  try {
    const response = await fetch(
      'https://apphub.andritz.com/appsapi/secure/refresh-token',
      { method: 'GET', headers: { Authorization: `Bearer ${getToken()}` } }
    );
    if (!response.ok) throw new Error(`Refresh failed: ${response.status}`);

    const { token: newToken } = await response.json();
    storeTokenInSession(newToken);   // decodes validity from new JWT
    scheduleTokenRefresh();          // rearm for next cycle
  } catch (err) {
    console.error('[auth] Token refresh failed:', err);

    if (import.meta.env.DEV) {
      // In local dev the fallback token is already expired, so the refresh
      // call will always fail. Re-seed the session instead of redirecting.
      console.warn('[auth][DEV] Re-seeding session from DEV_FALLBACK_TOKEN.');
      storeTokenInSession(DEV_FALLBACK_TOKEN);
      scheduleTokenRefresh();
    } else {
      handleSessionExpiry();
    }
  }
};

/**
 * Clears all session data, cancels the timer, and redirects to /login.
 */
const handleSessionExpiry = () => {
  clearToken();
  window.location.href = '/login';
};

// ──────────────────────────────────────────────────────────────────────────
// PUBLIC API
// ──────────────────────────────────────────────────────────────────────────

/**
 * Returns the active auth token.
 *  - Production : token stored by initSession() after a real login.
 *  - Local dev  : falls back to DEV_FALLBACK_TOKEN from config.js when
 *                 sessionStorage is empty (before login API is live).
 */
export const getToken = () =>
  sessionStorage.getItem(TOKEN_KEY) ||
  (import.meta.env.DEV ? DEV_FALLBACK_TOKEN : null);

/**
 * Entry point called after a successful login (production)
 * or on app startup in dev mode (see App.jsx useEffect).
 *
 * Stores session data (appAccessToken, validity, tokenCreatedAt, appHub,
 * appsBaseUrl) and arms the automatic refresh timer.
 */
export const initSession = (token) => {
  storeTokenInSession(token);
  scheduleTokenRefresh();
};

/**
 * Removes all session keys from sessionStorage and cancels the refresh timer.
 * Called on logout or session expiry.
 */
export const clearToken = () => {
  [TOKEN_KEY, VALIDITY_KEY, CREATED_AT_KEY, 'appHub', 'appsBaseUrl']
    .forEach((k) => sessionStorage.removeItem(k));
  if (_refreshTimer) { clearTimeout(_refreshTimer); _refreshTimer = null; }
};

/**
 * Returns true when a token is present (user is authenticated).
 */
export const isLoggedIn = () => !!getToken();

/**
 * Posts all required AppHub session values to an embedded iframe via
 * postMessage so the iframe's own origin can store them in its sessionStorage.
 *
 * isDashboardEmbeddedInApp is hardcoded here — it is intentionally
 * NOT stored in the app's own sessionStorage.
 */
export const postSessionToIframe = (iframeEl) => {
  if (!iframeEl?.contentWindow) return;

  const payload = {
    type: 'SET_SESSION',
    data: {
      appAccessToken: sessionStorage.getItem(TOKEN_KEY) || getToken(),
      appHub: sessionStorage.getItem('appHub') || 'true',
      appsBaseUrl: sessionStorage.getItem('appsBaseUrl') || 'https://apphub.andritz.com/appsapi/',
      isDashboardEmbeddedInApp: 'true',
    }
  };

  iframeEl.contentWindow.postMessage(payload, 'https://apphub.andritz.com');
};
