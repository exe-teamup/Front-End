/**
 * Authentication token management utilities
 */

const AUTH_TOKEN_KEY = 'authToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

function setCookie(name: string, value: string, days = 7) {
  const expires = new Date(
    Date.now() + days * 24 * 60 * 60 * 1000
  ).toUTCString();
  const secureFlag = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${name}=${encodeURIComponent(value)}; Expires=${expires}; Path=/; SameSite=Lax${secureFlag}`;
}

function getCookie(name: string): string | null {
  const match = document.cookie
    .split('; ')
    .find(row => row.startsWith(name + '='));
  return match ? decodeURIComponent(match.split('=')[1]) : null;
}

function deleteCookie(name: string) {
  const secureFlag = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${name}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; SameSite=Lax${secureFlag}`;
}

export class AuthTokenManager {
  /**
   * Get the current auth token
   */
  static getToken(): string | null {
    return getCookie(AUTH_TOKEN_KEY);
  }

  /**
   * Set the auth token
   */
  static setToken(token: string): void {
    setCookie(AUTH_TOKEN_KEY, token);
  }

  /**
   * Remove the auth token
   */
  static removeToken(): void {
    deleteCookie(AUTH_TOKEN_KEY);
  }

  /**
   * Get the refresh token
   */
  static getRefreshToken(): string | null {
    return getCookie(REFRESH_TOKEN_KEY);
  }

  /**
   * Set the refresh token
   */
  static setRefreshToken(token: string): void {
    setCookie(REFRESH_TOKEN_KEY, token);
  }

  /**
   * Remove the refresh token
   */
  static removeRefreshToken(): void {
    deleteCookie(REFRESH_TOKEN_KEY);
  }

  /**
   * Clear all tokens
   */
  static clearTokens(): void {
    this.removeToken();
    this.removeRefreshToken();
  }

  /**
   * Check if user is authenticated
   */
  static isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
