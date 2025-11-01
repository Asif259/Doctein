import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({
  path: ".env",
});

const JWT_SECRET = process.env.JWT_SECRET || "";

// Parse token expiration from environment variable
// Supports formats: "7d" (7 days), "24h" (24 hours), "30" (30 days), or just number (days)
const parseTokenExpiration = (): string => {
  const tokenExpiration = process.env.TOKEN_EXPIRATION || "30"; // Default to 30 days

  // If it's already in JWT format (e.g., "7d", "24h", "30m")
  if (
    tokenExpiration.includes("d") ||
    tokenExpiration.includes("h") ||
    tokenExpiration.includes("m") ||
    tokenExpiration.includes("s")
  ) {
    return tokenExpiration;
  }

  // Otherwise, treat as days
  const days = parseInt(tokenExpiration, 10);
  if (isNaN(days) || days <= 0) {
    console.warn(
      `Invalid TOKEN_EXPIRATION value: ${tokenExpiration}. Using default 30 days.`
    );
    return "30d";
  }

  return `${days}d`;
};

const tokenExpiration = parseTokenExpiration();

// Generate Access Token
export const generateAccessToken = (user: any) => {
  console.log(`Token expiration set to: ${tokenExpiration}`);
  const payload = { email: user.email, userId: user._id };
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: tokenExpiration,
  });
};

// Generate Refresh Token
// export const generateRefreshToken = (user: any) => {
//   const payload = { email: user.email, userId: user._id };
//   return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
// };

// Verify Token and Generate New Access Token
export const verifyToken = (token: string, secret: string): any => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
};

// export const refreshToken = (refreshToken: string): string | null => {
//   const user = verifyToken(refreshToken, REFRESH_TOKEN_SECRET);
//   if (!user) return null;
//
//   return generateAccessToken({ email: user.email, userId: user._id });
// };
