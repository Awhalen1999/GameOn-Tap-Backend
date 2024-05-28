import db from '../data/db';
import { Email } from '../types';

// Existing function to get a specific user by its ID
export async function getUser(userId: number) {
  const users = await db`
    SELECT *
    FROM users
    WHERE id = ${userId}
  `;
  if (users.length > 0) {
    return users[0];
  } else {
    throw new Error('User not found');
  }
}

// API function to login a user
export async function loginUser(email: Email, password: string) {
  const users = await db`
    SELECT *
    FROM users
    WHERE email = ${email} AND password = ${password}
  `;
  if (users.length > 0) {
    return users[0];
  } else {
    throw new Error('Invalid email or password');
  }
}

// API function to signup a new user
export async function signupUser(
  username: string,
  email: Email,
  password: string
) {
  const existingUserByEmail = await db`
    SELECT *
    FROM users
    WHERE email = ${email}
  `;
  const existingUserByUsername = await db`
    SELECT *
    FROM users
    WHERE username = ${username}
  `;
  if (existingUserByEmail.length > 0) {
    throw new Error('Email already in use');
  } else if (existingUserByUsername.length > 0) {
    throw new Error('Username already in use');
  } else {
    const newUser = await db`
      INSERT INTO users
        (username, email, password)
      VALUES
        (${username}, ${email}, ${password})
      RETURNING *
    `;
    return newUser[0];
  }
}
