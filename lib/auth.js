import jwt from "jsonwebtoken";

const DEFAULT_SECRET = "ppdb-secret-development";

export function signToken(payload) {
  const secret = process.env.AUTH_SECRET || DEFAULT_SECRET;
  return jwt.sign(payload, secret, { expiresIn: "7d" });
}

export function verifyToken(token) {
  const secret = process.env.AUTH_SECRET || DEFAULT_SECRET;
  if (!token) return null;

  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
}

