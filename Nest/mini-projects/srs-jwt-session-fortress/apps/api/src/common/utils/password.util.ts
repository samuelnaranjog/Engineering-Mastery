import { hash, verify, type Options } from '@node-rs/argon2';

// Recommended baseline settings (OWASP minimums)
const ARGON2_CONFIG: Options = {
  memoryCost: 19456, // 19 MiB RAM usage
  timeCost: 2,       // 2 iterations
  parallelism: 1,    // 1 thread
};

/**
 * Hashes a plaintext password using Argon2id.
 * Generates a cryptographically secure random salt automatically.
 */
export async function hashPassword(password: string): Promise<string> {
  return hash(password, ARGON2_CONFIG);
}

/**
 * Verifies an incoming plaintext password against the stored PHC-string hash.
 * Constant-time comparison prevents timing attacks.
 */
export async function verifyPassword(
  storedHash: string,
  candidate: string
): Promise<boolean> {
  try {
    return await verify(storedHash, candidate);
  } catch {
    return false;
  }
}