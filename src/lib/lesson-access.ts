export const PAID_COOKIE_NAME = "is_paid_token";

const COOKIE_TTL_SECONDS = 60 * 60 * 24 * 30;
export const PAID_COOKIE_MAX_AGE = COOKIE_TTL_SECONDS;

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function getSecret(): string {
  const secret = process.env.LESSON_ACCESS_SECRET;
  if (!secret) {
    throw new Error("LESSON_ACCESS_SECRET is not set");
  }
  return secret;
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array {
  const padded = value
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

async function sign(payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(payload),
  );
  return toBase64Url(new Uint8Array(signature));
}

function signaturesMatch(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  let difference = 0;
  for (let index = 0; index < a.length; index += 1) {
    difference |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }
  return difference === 0;
}

export async function createAccessToken(checkoutId: string): Promise<string> {
  const payload = toBase64Url(
    encoder.encode(
      JSON.stringify({
        sub: checkoutId,
        exp: Math.floor(Date.now() / 1000) + COOKIE_TTL_SECONDS,
      }),
    ),
  );
  return `${payload}.${await sign(payload)}`;
}

export async function verifyAccessToken(
  token: string | undefined,
): Promise<boolean> {
  if (!token) {
    return false;
  }

  const [payload, signature, ...rest] = token.split(".");
  if (!payload || !signature || rest.length > 0) {
    return false;
  }

  try {
    if (!signaturesMatch(await sign(payload), signature)) {
      return false;
    }

    const data = JSON.parse(decoder.decode(fromBase64Url(payload))) as {
      sub?: unknown;
      exp?: unknown;
    };

    return (
      typeof data.sub === "string" &&
      typeof data.exp === "number" &&
      data.exp > Math.floor(Date.now() / 1000)
    );
  } catch {
    return false;
  }
}
