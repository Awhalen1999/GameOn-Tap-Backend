import { User } from '../types';
import db from './db';

const users: User[] = [
  {
    id: 1,
    email: 'user1@gmail.com',
    username: 'user1',
    password: 'got1',
    theme: 'myDark',
  },
];

export async function getUsers(): Promise<User[]> {
  const results = (await db`select id,email,username from users`) as User[];

  return users;
}

export async function addUser(user: User): Promise<User> {
  const results = (await db`select id,email,username from users`) as User[];

  users.push(user);
  return user;
}
