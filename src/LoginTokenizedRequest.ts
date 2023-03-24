import { Request } from "express";
import { LoginParameters } from "./LoginParameters";

export interface LoginTokenizedRequest extends Request {
  user: LoginParameters;
}
