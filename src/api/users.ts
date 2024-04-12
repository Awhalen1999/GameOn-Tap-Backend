import * as data from '../data/users';

// API function to get a specific user by its ID
export async function getUser(userId: string) {
  const users = await data.getUsers();
  const user = users.find((user) => user.id === userId);

  if (user) {
    return user;
  } else {
    throw new Error('User not found');
  }
}
