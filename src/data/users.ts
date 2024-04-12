import { User } from '../types';

const users: User[] = [
  {
    id: '1',
    email: 'user1@gmail.com',
    password: 'password1',
    theme: 'myDark',
  },
];

export async function getUsers(): Promise<User[]> {
  return users;
}
