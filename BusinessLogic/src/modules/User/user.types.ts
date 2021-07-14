export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
}

export type UserDTO = {
  id?: string;
  email: string;
  role: UserRole;
  name: string;
};

export type UserSearchable = {
  email?: string;
};
