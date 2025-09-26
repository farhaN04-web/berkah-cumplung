export interface User {
  name: string;
  email: string;
  photo: string;
  role: "user" | "admin";
}

export interface Session {
  user: User;
  token: string;
}
