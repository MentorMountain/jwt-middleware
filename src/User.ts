export type UserRole = "student" | "mentor";

export interface User {
  username: string;
  authHash: string;
  role: UserRole;
  lastConnectedIP: string;
}

export interface UserToken {
  username: string;
  role: UserRole;
}
