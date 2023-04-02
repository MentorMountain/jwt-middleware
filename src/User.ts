export type UserRole = "student" | "mentor";

export interface User {
  username: string;
  authHash: string;
  role: UserRole;
  lastLoginIP: string;
  lastLoginTime: number;
}

export interface UserToken {
  username: string;
  role: UserRole;
}
