export type AuthPayload = { sub: string; exp: number };

const enc = new TextEncoder();

const importKey = async (secret: string) => {
  return crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
};

const toHex = (u8: Uint8Array) => Array.from(u8).map((b) => b.toString(16).padStart(2, "0")).join("");

export const signToken = async (payload: AuthPayload, secret: string) => {
  const key = await importKey(secret);
  const json = JSON.stringify(payload);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(json));
  const token = `${encodeURIComponent(json)}.${toHex(new Uint8Array(sig))}`;
  return token;
};

export const verifyToken = async (token: string, secret: string) => {
  const [data, signature] = token.split(".");
  if (!data || !signature) return null;
  let json = "";
  try {
    json = decodeURIComponent(data);
  } catch {
    return null;
  }
  let payload: AuthPayload | null = null;
  try {
    payload = JSON.parse(json);
  } catch {
    return null;
  }
  const key = await importKey(secret);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(json));
  const expected = toHex(new Uint8Array(sig));
  if (expected !== signature) return null;
  if (!payload || typeof payload.exp !== "number" || Date.now() > payload.exp) return null;
  return payload;
};
