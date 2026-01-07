import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import db from '../db.js';

const PgSession = connectPgSimple(session);

const isProd = process.env.NODE_ENV === 'production';

export const sessionMiddleware = session({
  store: new PgSession({
    pool: db,
    tableName: 'user_sessions',
  }),
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 14, // 14 days
  },
});
