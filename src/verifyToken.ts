import { NextFunction, Request, Response } from "express";

function extractLoginToken(data: string) {
  return "";
}

function validateJWT(jwt: string) {
  return true;
}

function extractJWT(jwt: string) {
  return {};
}

function validateLoginToken(req: Request, res: Response, next: NextFunction) {
  // Extract JWT from authorization header
  const token = extractLoginToken("");
  const isValid = validateJWT(token);

  if (!isValid) {
    return res.status(401).send("Invalid login token");
  }

  const {} = extractJWT(token);

  // req.todo = todo;

  next(); // Continue
}

export { validateLoginToken };
