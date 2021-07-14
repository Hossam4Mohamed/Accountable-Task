import jwt from 'jsonwebtoken';

import UserModel from './user.model';

import { UserDTO, UserSearchable } from './user.types';

export async function getUserById(userId: string): Promise<UserDTO> {
  return UserModel.findById(userId);
}

export async function getUserByQuery(query: UserSearchable): Promise<UserDTO> {
  return UserModel.findOne(query);
}

export function getAccessToken(userId: string, email: string): string {
  return jwt.sign({ userId, email }, process.env.JWT_SECRET || 'JWT_SECRET');
}

export async function updateUser(userId: string, data: UserDTO): Promise<void> {
  return UserModel.findByIdAndUpdate(userId, { $set: data });
}

export async function addUserToDatabase(data: UserDTO): Promise<UserDTO> {
  return UserModel.create(data);
}
