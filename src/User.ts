export type UserRole = "student" | "mentor";

export interface User {
  username: string;
  authHash: string;
  role: UserRole;
}
