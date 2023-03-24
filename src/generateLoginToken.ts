import { LoginTokenParameters } from "./LoginTokenParameters";
import jsonwebtoken from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { LoginParameters } from "./LoginParameters";

const expiry = "1h";

function generateLoginToken(
  { computingID, role, courses }: LoginParameters,
  { GATEWAY_DOMAIN, JWT_SECRET, WEBAPP_DOMAIN }: LoginTokenParameters
) {
  return jsonwebtoken.sign({ computingID, role, courses }, JWT_SECRET, {
    audience: WEBAPP_DOMAIN,
    issuer: GATEWAY_DOMAIN,
    expiresIn: expiry,
    jwtid: uuidv4(),
  });
}

export { generateLoginToken };
