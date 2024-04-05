import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { GamesRouter } from './routers';

const app = new Hono();

// Enable CORS for all routes
app.all(cors({ origin: 'https://awhalen1999.github.io/GameOn-Tap/' }));

app.route('/games', GamesRouter);

const port = 3000;

serve({
  fetch: app.fetch,
  port,
});

console.log(`Server is running on port ${port}`);
