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
      'https://awhalen1999.github.io',
      'http://localhost:5173',
      'https://Gameontap-prod-env.eba-hmtmfnti.us-east-1.elasticbeanstalk.com',
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
    expireAfterSeconds: 7200, // 2 hours
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

app.get('/health', async (c) => {
  try {
    c.status(200);
    return c.text('ok');
  } catch (error) {
    c.status(500);
    return c.text('not ok');
  }
});

app.get('/', (c) => c.text('Welcome to the API'));

const port = process.env.PORT || 8080;

serve({
  fetch: app.fetch,
  //@ts-ignore
  port,
});

console.log(`Server is running on port ${port}`);
