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

// Log all incoming requests
app.use('*', async (c, next) => {
  console.log(`Received ${c.req.method} request to ${c.req.url}`);
  await next();
  console.log(`Response status: ${c.res.status}`);
});

// CORS setup with logging
app.use(
  cors({
    origin: ['https://www.gameontap.xyz', 'http://localhost:5173'],
    credentials: true,
  })
);

// Log session middleware initialization
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
console.log('Registering routes');
app.route('/games', GamesRouter);
app.route('/users', RulesetsRouter);
app.route('/users', UsersRouter);

// Health check route with logging
app.get('/health', async (c) => {
  try {
    console.log('Health check endpoint hit');
    c.status(200);
    return c.text('ok');
  } catch (error) {
    console.error('Health check failed', error);
    c.status(500);
    return c.text('not ok');
  }
});

// Root route with logging
app.get('/', (c) => {
  console.log('Root endpoint hit');
  return c.text('Welcome to the API');
});

// Start the server with logging
const port = process.env.PORT || 8080;
serve({
  fetch: app.fetch,
  //@ts-ignore
  port,
});

console.log(`Server is running on port ${port}`);
