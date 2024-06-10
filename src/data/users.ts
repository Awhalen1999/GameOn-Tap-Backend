import db from './db';
import { User, UserWithoutPassword } from '../types';

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

export async function SignupUser(user: User): Promise<UserWithoutPassword> {
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
  };
}
