import crypto from "crypto";

const SECRET = "i-LOOOOVE-inferno! GOLD GOLD GOLD";

export function random() {
  crypto.randomBytes(128).toString("base64");
}

export function auth(salt: string, pass: string) {
  return crypto
    .createHmac("sha256", [salt, pass].join("/"))
    .update(SECRET)
    .digest("hex");
}
