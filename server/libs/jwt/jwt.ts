/**
 * Encode, decode and verify auth tokens.
 *
 * @author  Marinel Cirstea
 */

import { createHmac } from "crypto";

const invalidSecret = new Error(`Invalid jwt secret!`);

export interface Payload {
  iat: number;
  exp: number;
  [key: string]: any;
}
interface Header {
  alg: string;
  typ: string;
}
export type Token = string;

/**
 * Decode and verify a JWT token.
 *
 * @returns `payload`(object)
 */
export interface IDecode {
  (token: Token, secret: string): Payload;
}
const decode: IDecode = (token, secret) => {
  if (!secret) throw invalidSecret;
  if (!token || !hasValidSignature(token, secret)) {
    throw new Error("Invalid token.");
  }

  const payload = decodeBase64UrlAndParse(token.split(".")[1]);
  const isExpired = Date.now() > payload.iat + payload.exp * 1000; /* s -> ms */

  if (isExpired) throw new Error("Token expired.");

  return payload;
};

/**
 * Encodes data(payload) and returns a token(string)
 *
 * @returns `token`(string) if the encoding was successfull
 */
export interface IEncode {
  (payload: Payload, secret: string): Token;
}
const encode: IEncode = (payload, secret) => {
  if (!secret) throw invalidSecret;
  if (!payload || !Object.keys(payload)[0]) {
    throw new Error("Invalid payload.");
  }

  const segments = [];
  segments.push(stringifyAndEncodeBase64Url({ alg: "HS256", typ: "JWT" })); // Header
  segments.push(stringifyAndEncodeBase64Url(payload)); // Payload
  segments.push(sign(segments.join("."), secret)); // Signature
  const token = segments.join(".");

  return token;
};

function hasValidSignature(token: Token, secret: string): boolean {
  const [header, payload, signature] = token.split(".");
  return signature === sign(`${header}.${payload}`, secret);
}

function sign(input: any, secret: string): string {
  const base64Hmac = createHmac("sha256", `${secret}`).update(input).digest("base64url");

  return base64Hmac;
}

function stringifyAndEncodeBase64Url(obj: Payload | Header): string {
  return Buffer.from(JSON.stringify(obj)).toString("base64url");
}

function decodeBase64UrlAndParse(str: string): Payload {
  return JSON.parse(Buffer.from(str, "base64url").toString());
}

export default { encode, decode };
