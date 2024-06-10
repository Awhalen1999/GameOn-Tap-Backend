import db from './db';
import { User } from '../types';

export async function LoginUser(
  email: string,
  password: string
): Promise<User> {
  const users = await db`
    SELECT * FROM users
    WHERE email = ${email} AND password = ${password}
  `;
  if (users.length > 0) {
    return {
      user_id: users[0].user_id as number,
      email: users[0].email as string,
      username: users[0].username as string,
      theme: users[0].theme as string,
      password: users[0].password as string,
    };
  } else {
    throw new Error('Invalid email or password');
  }
}

export async function SignupUser(user: User): Promise<User> {
  const existingUsers = await db`
    SELECT * FROM users
    WHERE email = ${user.email} OR username = ${user.username}
  `;
  if (existingUsers.length > 0) {
    throw new Error('A user with this email or username already exists');
  } else {
    const users = await db`
      INSERT INTO users
        (email, username, password, theme)
      VALUES
        (${user.email}, ${user.username}, ${user.password}, ${user.theme})
      RETURNING user_id, email, username, theme
    `;
    return {
      user_id: users[0].user_id as number,
      email: users[0].email as string,
      username: users[0].username as string,
      theme: users[0].theme as string,
      password: users[0].password as string,
    };
  }
}
