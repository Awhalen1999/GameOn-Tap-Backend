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

app.use(
  cors({
    origin: [
      'https://awhalen1999.github.io/GameOn-Tap/',
      'http://localhost:5173',
    ],
    credentials: true,
  })
);

const store = new CookieStore();

app.use(
  '*',
  sessionMiddleware({
    store,
    encryptionKey: 'password_at_least_32_characters_long',
    expireAfterSeconds: 900,
    cookieOptions: {
      sameSite: 'None',
      path: '/',
      httpOnly: true,
      secure: true,
    },
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
