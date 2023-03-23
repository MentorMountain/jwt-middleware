import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { API_GATEWAY_AUTHORIZATION_HEADER } from "./google";

interface LoginTokenParameters {
  JWT_SECRET: string;
  GATEWAY_DOMAIN: string; // e.g. https://google.google.google.com
  WEBAPP_DOMAIN: string; // e.g. https://www.mentormountain.ca
}

function extractLoginToken(req: Request) {
  return req.header(API_GATEWAY_AUTHORIZATION_HEADER);
}

function validateJWT(
  jwt: string,
  { JWT_SECRET, GATEWAY_DOMAIN, WEBAPP_DOMAIN }: LoginTokenParameters
) {
  if (!jwt) {
    return false;
  }

  try {
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
  if (!jwt) {
    throw new Error("JWT is empty");
  }
  const data = jsonwebtoken.decode(jwt);
  return data;
}

function validateLoginToken(parameters: LoginTokenParameters) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Extract JWT from authorization header
    const token = extractLoginToken(req);
    if (token === undefined) {
      return res.status(401).send("Missing login token");
    }

    const isValid = validateJWT(token, parameters);
    if (!isValid) {
      return res.status(401).send("Invalid login token");
    }

    const todo = extractJWT(token);

    // req.todo = todo; // Append token data to request

    next(); // Success
  };
}

export { validateLoginToken, LoginTokenParameters };
