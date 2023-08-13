import crypto from "crypto";

const SECRET = "i-LOOOOVE-inferno! GOLD GOLD GOLD";

export function random() {
  return crypto.randomBytes(128).toString("base64");
}

export function auth(salt: string, pass: string) {
  return crypto
    .createHmac("sha256", [salt, pass].join("/"))
    .update(SECRET)
    .digest("hex");
}

export function randomString(size: number) {
  if (size < 2) {
    return crypto.randomBytes(4).toString("hex");
  } else if (size > 20) {
    return crypto.randomBytes(12).toString("hex");
  }
  return crypto.randomBytes(size / 2).toString("hex");
}
