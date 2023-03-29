import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { API_GATEWAY_AUTHORIZATION_HEADER } from "./google";
import { LoginParameters } from "./LoginParameters";
import { LoginTokenParameters } from "./LoginTokenParameters";
import { LoginTokenizedRequest } from "./LoginTokenizedRequest";

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

function extractJWT(jwt: string): LoginParameters {
  if (!jwt) {
    throw new Error("JWT is empty");
  }
  return jsonwebtoken.decode(jwt) as LoginParameters;
}

function validateLoginToken(parameters: LoginTokenParameters) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Extract JWT from authorization header
    const token = extractLoginToken(req);
    if (!token) {
      return res.status(401).json({ error: "Missing login token" });
    }

    if (!validateJWT(token, parameters)) {
      return res.status(401).json({ error: "Invalid login token" });
    }

    (req as LoginTokenizedRequest).user = extractJWT(token);
    next(); // Success
  };
}

export { validateLoginToken };
