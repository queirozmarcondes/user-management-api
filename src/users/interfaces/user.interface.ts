export interface User {
  name: string;
  email: string;
  password: string;
  photo?: string;
  roles: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
