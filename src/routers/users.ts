import { Hono } from 'hono';
import * as userHandlers from '../handlers/users';

const UsersRouter = new Hono();

// Endpoint to get a specific user by ID
UsersRouter.get('/:userId', userHandlers.getUser);

export default UsersRouter;
