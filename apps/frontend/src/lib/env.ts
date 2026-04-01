/**
 * Environment variable validation
 * Ensures required env vars are present and properly typed
 */

// Public env vars (exposed to browser - NEXT_PUBLIC_ prefix)
export const publicEnv = {
  // API URL for frontend requests
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "",

  // Environment name
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT || "development",

  // Feature flags (safe to expose)
  enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true",
} as const;

// Server-only env vars (never exposed to browser)
// Only use these in Server Components, API routes, or middleware
export const serverEnv = {
  // AWS Cognito (auth)
  cognitoUserPoolId: process.env.COGNITO_USER_POOL_ID || "",
  cognitoClientId: process.env.COGNITO_CLIENT_ID || "",
  cognitoClientSecret: process.env.COGNITO_CLIENT_SECRET || "",

  // API keys (never expose these)
  apiSecretKey: process.env.API_SECRET_KEY || "",

  // Database (if direct connection needed)
  databaseUrl: process.env.DATABASE_URL || "",
} as const;

/**
 * Validate required environment variables
 * Call this in your app initialization
 */
export function validateEnv(): { valid: boolean; missing: string[] } {
  const requiredPublic: (keyof typeof publicEnv)[] = ["apiUrl"];

  const requiredServer: (keyof typeof serverEnv)[] = [
    // Add required server env vars here when needed
    // "cognitoUserPoolId",
    // "cognitoClientId",
  ];

  const missing: string[] = [];

  // Check public vars
  for (const key of requiredPublic) {
    if (!publicEnv[key]) {
      missing.push(`NEXT_PUBLIC_${key.replace(/([A-Z])/g, "_$1").toUpperCase()}`);
    }
  }

  // Check server vars (only on server)
  if (typeof window === "undefined") {
    for (const key of requiredServer) {
      if (!serverEnv[key]) {
        missing.push(key.replace(/([A-Z])/g, "_$1").toUpperCase());
      }
    }
  }

  return {
    valid: missing.length === 0,
    missing,
  };
}

/**
 * Type-safe environment check
 */
export function isDevelopment(): boolean {
  return publicEnv.environment === "development";
}

export function isProduction(): boolean {
  return publicEnv.environment === "production";
}

export function isStaging(): boolean {
  return publicEnv.environment === "staging";
}
