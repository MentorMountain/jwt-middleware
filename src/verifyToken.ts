import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";

interface LoginTokenParameters {
  JWT_SECRET: string;
  GATEWAY_DOMAIN: string; // e.g. https://google.google.google.com
  WEBAPP_DOMAIN: string; // e.g. https://www.mentormountain.ca
}

function extractLoginToken(data: string) {
  return "";
}

function validateJWT(
  jwt: string,
  { JWT_SECRET, GATEWAY_DOMAIN, WEBAPP_DOMAIN }: LoginTokenParameters
) {
  if (!jwt) {
    return false;
  }

  try {
    // jwt.verify throws an error if it is not valid
    jsonwebtoken.verify(jwt, JWT_SECRET, {
      audience: WEBAPP_DOMAIN,
      issuer: GATEWAY_DOMAIN,
      algorithms: ["HS256"],
      ignoreExpiration: false,
    });

    return true;
  } catch (e) {
    console.warn("Error verifying JWT");
    return false;
  }
}

function extractJWT(jwt: string) {
  return {};
}

function validateLoginToken(parameters: LoginTokenParameters) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Extract JWT from authorization header
    const token = extractLoginToken("");
    const isValid = validateJWT(token, parameters);

    if (!isValid) {
      return res.status(401).send("Invalid login token");
    }

    const {} = extractJWT(token);

    // req.todo = todo;

    next(); // Continue
  };
}

export { validateLoginToken, LoginTokenParameters };
