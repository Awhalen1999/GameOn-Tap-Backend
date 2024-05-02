import { User } from '../types';

const users: User[] = [
  {
    id: '1',
    email: 'user1@gmail.com',
    username: 'user1',
    password: 'got1',
    theme: 'myDark',
  },
];

export async function getUsers(): Promise<User[]> {
  return users;
}

export async function addUser(user: User): Promise<User> {
  users.push(user);
  return user;
}
