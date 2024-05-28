import db from '../data/db';
import { Email } from '../types';

// Existing function to get a specific user by its ID
export async function getUser(userId: number) {
  console.log('Getting user with ID:', userId);
  const users = await db`
    SELECT *
    FROM users
    WHERE id = ${userId}
  `;
  if (users.length > 0) {
    console.log('User found:', users[0]);
    return users[0];
  } else {
    console.error('User not found');
    throw new Error('User not found');
  }
}

// API function to login a user
export async function loginUser(email: Email, password: string) {
  console.log('Logging in user with email:', email);
  const users = await db`
    SELECT *
    FROM users
    WHERE email = ${email} AND password = ${password}
  `;
  if (users.length > 0) {
    console.log('Login successful for email:', email);
    return users[0];
  } else {
    console.error('Invalid email or password');
    throw new Error('Invalid email or password');
  }
}

// API function to signup a new user
export async function signupUser(
  username: string,
  email: Email,
  password: string,
  theme: string
) {
  console.log(
    'Signing up new user with email:',
    email,
    'username:',
    username,
    'and theme:',
    theme
  );
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
    console.error('Email already in use');
    throw new Error('Email already in use');
  } else if (existingUserByUsername.length > 0) {
    console.error('Username already in use');
    throw new Error('Username already in use');
  } else {
    try {
      const newUser = await db`
        INSERT INTO users
          (username, email, password, theme) 
        VALUES
          (${username}, ${email}, ${password}, ${theme})
        RETURNING *
      `;
      console.log('User signed up successfully:', newUser[0]);
      return newUser[0];
    } catch (error) {
      console.error('Error inserting user into database:', error);
      throw error;
    }
  }
}
