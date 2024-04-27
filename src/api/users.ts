import * as data from '../data/users';
import { Email } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Existing function to get a specific user by its ID
export async function getUser(userId: string) {
  const users = await data.getUsers();
  const user = users.find((user) => user.id === userId);

  if (user) {
    return user;
  } else {
    throw new Error('User not found');
  }
}

// API function to login a user
export async function loginUser(email: Email, password: string) {
  const users = await data.getUsers();
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    return user;
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
  const users = await data.getUsers();
  const existingUserByEmail = users.find((user) => user.email === email);
  const existingUserByUsername = users.find(
    (user) => user.username === username
  );

  if (existingUserByEmail) {
    throw new Error('Email already in use');
  } else if (existingUserByUsername) {
    throw new Error('Username already in use');
  } else {
    // Find the highest id
    const highestId = Math.max(...users.map((user) => Number(user.id)));

    // Increment the highest id to get the id for the new user
    const newId = String(highestId + 1);

    const newUser = await data.addUser({
      id: newId,
      username,
      email,
      password,
      theme: '',
    });
    return newUser;
  }
}
