export enum Role {
  User = 'user',
  Admin = 'admin',
}

export interface AuthItf {
  _id: string;
  email: string;
  username: string;
  password: string;
  role: Role;
  status: boolean;
}
