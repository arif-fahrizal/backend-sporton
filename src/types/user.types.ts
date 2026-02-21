import { Document } from 'mongoose';

export interface UserType {
  name: string;
  email: string;
  password: string;
}

export interface IUser extends UserType, Document {}
