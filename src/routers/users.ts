import { Hono } from 'hono';
import * as userHandlers from '../handlers/users';

const UsersRouter = new Hono();

// Endpoint for user login
UsersRouter.post('/login', userHandlers.loginUser);

// Endpoint for user signup
UsersRouter.post('/signup', userHandlers.signupUser);

// Endpoint for user logout
UsersRouter.post('/logout', userHandlers.logoutUser);

// Endpoint for user authentication
UsersRouter.get('/auth', userHandlers.authUser);

export default UsersRouter;
