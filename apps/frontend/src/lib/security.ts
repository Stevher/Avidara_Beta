/**
 * Security utilities for the Evidara frontend
 */

/**
 * Sanitize user input to prevent XSS
 * Use this for any user-provided content displayed in the UI
 */
export function sanitizeInput(input: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  };
  const reg = /[&<>"'/]/gi;
  return input.replace(reg, (match) => map[match] || match);
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Secure token storage using sessionStorage (clears on tab close)
 * For sensitive tokens, prefer httpOnly cookies set by the server
 */
export const secureStorage = {
  set(key: string, value: string): void {
    if (typeof window === "undefined") return;
    try {
      sessionStorage.setItem(key, value);
    } catch {
      console.error("Failed to store value securely");
    }
  },

  get(key: string): string | null {
    if (typeof window === "undefined") return null;
    try {
      return sessionStorage.getItem(key);
    } catch {
      return null;
    }
  },

  remove(key: string): void {
    if (typeof window === "undefined") return;
    try {
      sessionStorage.removeItem(key);
    } catch {
      console.error("Failed to remove value");
    }
  },

  clear(): void {
    if (typeof window === "undefined") return;
    try {
      sessionStorage.clear();
    } catch {
      console.error("Failed to clear storage");
    }
  },
};

/**
 * Generate a cryptographically secure random string
 */
export function generateSecureToken(length: number = 32): string {
  if (typeof window === "undefined") return "";
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

/**
 * Hash sensitive data using SHA-256 (client-side)
 * Note: For passwords, always hash server-side with bcrypt/argon2
 */
export async function hashData(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Validate URL to prevent open redirect vulnerabilities
 */
export function isValidRedirectUrl(url: string): boolean {
  try {
    const parsed = new URL(url, window.location.origin);
    // Only allow same-origin redirects
    return parsed.origin === window.location.origin;
  } catch {
    return false;
  }
}

/**
 * Rate limiting helper for client-side actions
 */
export function createRateLimiter(maxAttempts: number, windowMs: number) {
  const attempts: number[] = [];

  return {
    canAttempt(): boolean {
      const now = Date.now();
      // Remove old attempts outside the window
      while (attempts.length > 0 && attempts[0] < now - windowMs) {
        attempts.shift();
      }
      return attempts.length < maxAttempts;
    },

    recordAttempt(): void {
      attempts.push(Date.now());
    },

    reset(): void {
      attempts.length = 0;
    },
  };
}
