export type UserRole = "student" | "mentor";

export interface User {
  computingID: string;
  authHash: string;
  role: UserRole;
}
