import { DEV_FALLBACK_TOKEN } from '../config';

const TOKEN_KEY = 'accessToken';

/**
 * Saves the token received from the login API into sessionStorage.
 * Called once after a successful login.
 */
export const saveToken = (token) => sessionStorage.setItem(TOKEN_KEY, token);

/**
 * Returns the active auth token.
 * - In production: returns the token saved by saveToken() after login.
 * - In local dev:  falls back to DEV_FALLBACK_TOKEN from config.js when
 *                  sessionStorage is empty (i.e. before the real API is live).
 */
export const getToken = () =>
  sessionStorage.getItem(TOKEN_KEY) ||
  (import.meta.env.DEV ? DEV_FALLBACK_TOKEN : null);

/**
 * Removes the token from sessionStorage (logout / session expiry).
 */
export const clearToken = () => sessionStorage.removeItem(TOKEN_KEY);

/**
 * Returns true if a token is present (user is authenticated).
 */
export const isLoggedIn = () => !!getToken();
