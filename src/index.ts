import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { GamesRouter, UsersRouter, RulesetsRouter } from './routers';

const app = new Hono();

app.all(
  cors({
    origin: [
      'https://awhalen1999.github.io/GameOn-Tap/',
      'http://localhost:5173',
    ],
  })
);

app.route('/games', GamesRouter);
app.route('/users', RulesetsRouter);
app.route('/users', UsersRouter);

const port = 3000;

serve({
  fetch: app.fetch,
  port,
});

console.log(`Server is running on port ${port}`);
