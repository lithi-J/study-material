import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key_change_me_in_production";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d"; // 7 days default

export interface TokenPayload {
  id: string;
  email: string;
  name: string;
}

export function generateToken(payload: TokenPayload): string {
  console.log("DEBUG: Generating token with secret starting with:", JWT_SECRET.substring(0, 5));
  
  if (!JWT_SECRET || JWT_SECRET === "fallback_secret_key_change_me_in_production") {
    console.warn("JWT_SECRET is not configured properly. Using fallback secret.");
  }
  
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN as any,
  });
}

/**
 * Verify and decode a JWT token
 */
export function verifyToken(token: string): TokenPayload | null {
  console.log("DEBUG: Verifying token with secret starting with:", JWT_SECRET.substring(0, 5));
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return decoded;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}

/**
 * Extract token from Authorization header
 */
export function extractTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader) return null;
  
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return null;
  }
  
  return parts[1];
}
