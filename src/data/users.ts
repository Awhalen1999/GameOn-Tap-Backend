import { User } from '../types';
import { getSql } from './db';

//login user
export type LoginInputParameters = Omit<User, 'user_id' | 'username'>;

export async function LoginUser({ email }: { email: string }): Promise<User> {
  const db = await getSql();
  const users = await db`
    SELECT * FROM users
    WHERE email = ${email}
  `;
  if (users.length > 0) {
    return {
      user_id: users[0].user_id as number,
      email: users[0].email as string,
      username: users[0].username as string,
      password: users[0].password as string,
    };
  } else {
    throw new Error('Invalid email or password');
  }
}

//signup user
export type SignupUserParameters = Omit<User, 'user_id'>;

export async function SignupUser({
  email,
  username,
  password,
}: SignupUserParameters): Promise<User> {
  const db = await getSql();
  const existingUsers = await db`
    SELECT * FROM users
    WHERE email = ${email} OR username = ${username}
  `;
  if (existingUsers.length > 0) {
    throw new Error('A user with this email or username already exists');
  } else {
    const [user] = await db.begin(async (sql) => {
      const [createdUser] = await sql`
      INSERT INTO users
        (email, username, password)
      VALUES
        (${email}, ${username}, ${password})
      RETURNING user_id, email, username
    `;

      await sql`
    INSERT INTO active_rulesets
    (user_id, game_id, ruleset_id)
    VALUES
    (${createdUser.user_id}, 'KingsCup', 1),
    (${createdUser.user_id}, 'DiceRoll', 2),
    (${createdUser.user_id}, 'DrinkRoulette', 3),
    (${createdUser.user_id}, 'BountyBlast', 4),
    (${createdUser.user_id}, 'RideTheBus', 5),
    (${createdUser.user_id}, 'Snap', 6),
    (${createdUser.user_id}, 'Trivia', 7),
    (${createdUser.user_id}, 'PromptDash', 8)
  `;

      return [createdUser];
    });

    return {
      user_id: user.user_id as number,
      email: user.email as string,
      username: user.username as string,
      password: user.password as string,
    };
  }
}
