import db from './db';
import { User, UserWithoutPassword } from '../types';

export async function getUsers(): Promise<UserWithoutPassword[]> {
  const users = await db`
    SELECT
      id,
      email,
      username,
      theme
    FROM users
  `;
  return users.map((user) => ({
    id: user.id as number,
    email: user.email as string,
    username: user.username as string,
    theme: user.theme as string,
  }));
}

export async function addUser(user: User): Promise<UserWithoutPassword> {
  const users = await db`
    INSERT INTO users
      (email, username, password, theme)
    VALUES
      (${user.email}, ${user.username}, ${user.password}, ${user.theme})
    RETURNING id, email, username, theme
  `;
  return {
    id: users[0].id as number,
    email: users[0].email as string,
    username: users[0].username as string,
    theme: users[0].theme as string,
  };
}
