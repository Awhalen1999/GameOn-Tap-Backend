import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { GamesRouter, UsersRouter, RulesetsRouter } from './routers';
import { CookieStore, sessionMiddleware, Session } from 'hono-sessions';

const app = new Hono<{
  Variables: {
    session: Session;
    session_key_rotation: boolean;
  };
}>();

// CORS setup
app.use(
  cors({
    origin: ['https://www.gameontap.xyz', 'http://localhost:5173'],
    credentials: true,
  })
);

// session middleware
const store = new CookieStore();
app.use(
  '*',
  sessionMiddleware({
    store,
    encryptionKey: 'password_at_least_32_characters_long',
    expireAfterSeconds: 7200, // 2 hours
    cookieOptions: {
      sameSite: 'None',
      path: '/',
      httpOnly: true,
      secure: true,
    },
  })
);

// Log routes registration
app.route('/games', GamesRouter);
app.route('/users', RulesetsRouter);
app.route('/users', UsersRouter);

// Root route with logging
app.get('/', (c) => {
  console.log('Root endpoint hit');
  return c.text('Welcome to the API');
});

// Start the server
const port = process.env.PORT || 8080;
serve({
  fetch: app.fetch,
  //@ts-ignore
  port,
});

console.log(`Server is running on port ${port}`);
