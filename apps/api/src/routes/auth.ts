import { Router } from 'express';
import db from '../db.js';
import argon2 from 'argon2';

const router = Router();

router.get('/me', (req, res) => {
  return res.json({ user: req.session.user ?? null });
});

router.post('/signup', async (req, res) => {
  const email = String(req.body.email ?? '')
    .trim()
    .toLowerCase();
  const password = String(req.body.password ?? '');

  if (!email || password.length < 10) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }

  const passwordHash = await argon2.hash(password, { type: argon2.argon2id });

  try {
    const { rows } = await db.query(
      `
      INSERT INTO users (email, password_hash)
      VALUES ($1, $2)
      RETURNING id, email
      `,
      [email, passwordHash]
    );

    const user = rows[0];
    req.session.user = { id: user.id, email: user.email };
    return res.status(201).json({ user: req.session.user });
  } catch (err: any) {
    if (err?.code === '2305') {
      return res.status(409).json({ error: 'Email already in use' });
    }
    console.error('Signup Error:', err);
    return res.status(500).json({ error: 'Internal services error' });
  }
});

router.post('/login', async (req, res) => {
  const email = String(req.body.email ?? '')
    .trim()
    .toLowerCase();
  const password = String(req.body.password ?? '');

  const { rows } = await db.query(
    `SELECT id, email, password_hash FROM users WHERE email=$1 LIMIT 1`,
    [email]
  );

  if (rows.length === 0) {
    return res
      .status(401)
      .json({ error: 'Invalid Credentials: User not found' });
  }

  const user = rows[0];
  const ok = await argon2.verify(user.password_hash, password);
  if (!ok) {
    return res
      .status(401)
      .json({ error: 'Invalid Credentials: Incorrect password' });
  }

  req.session.user = { id: user.id, email: user.email };
  return res.json({ user: req.session.user });
});

router.post('/logout', async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: 'Failed to logout' });
    res.clearCookie('connect.sid');
    return res.json({ ok: true });
  });
});

export default router;
