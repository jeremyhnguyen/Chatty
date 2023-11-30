/* eslint-disable @typescript-eslint/no-unused-vars */
import 'dotenv/config';
import express from 'express';
// import { createServer } from 'http';
import pg from 'pg';
import { ClientError, errorMiddleware } from './lib/index.js';
// import { Server } from 'socket.io';
// import cors from 'cors';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

type User = {
  userId: number;
  username: string;
  hashedPassword: string;
};
type Auth = {
  username: string;
  password: string;
};
//
const hashKey = process.env.TOKEN_SECRET;
if (!hashKey) throw new Error('TOKEN_SECRET not found in .env');

const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DB_NAME}?sslmode=require`;
const db = new pg.Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();
// const httpServer = createServer(app);

// const io = new Server(httpServer, {
//   cors: {
//     origin: '*',
//     // origin: [
//     //   'http://localhost:5173',
//     //   'http://127.0.0.1:5173',
//     //   'http://chatty-dev.us-west-2.elasticbeanstalk.com',
//     // ],
//     methods: ['GET', 'POST'],
//     credentials: true,
//   },
//   // connectionStateRecovery: {}, state recovery default function (may not need)
// });

// io.on('connection', (socket) => {
//   console.log('user connected');
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });

// });

// httpServer.listen(8081, () => {
//   console.log('httpServer listening on port 8081');
// });

// 8081 for socket server

// Create paths for static directories
const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

// app.use(cors());
app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.get('/api/hello', async (req, res) => {
  res.json({ connectionString, message: 'Hi' });
});

app.get('/api/info', async (req, res) => {
  const result = await db.query('select * from users');
  res.json({ connectionString, users: result.rows });
});

app.post('/api/auth/sign-up', async (req, res, next) => {
  try {
    const { username, password } = req.body as Partial<Auth>;
    if (!username || !password) {
      throw new ClientError(400, 'username and password are required fields');
    }
    const hashedPassword = await argon2.hash(password);
    const sql = `
      insert into "users" ("username", "hashedPassword")
      values ($1, $2)
      returning "username", "createdAt"
    `;
    const params = [username, hashedPassword];
    const result = await db.query<User>(sql, params);
    const [user] = result.rows;
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

app.post('/api/auth/sign-in', async (req, res, next) => {
  try {
    const { username, password } = req.body as Partial<Auth>;
    if (!username || !password) {
      throw new ClientError(401, 'invalid login');
    }
    const sql = `
    select "userId",
           "hashedPassword"
      from "users"
     where "username" = $1
  `;
    const params = [username];
    const result = await db.query<User>(sql, params);
    const [user] = result.rows;
    if (!user) {
      throw new ClientError(401, 'invalid login');
    }
    const { userId, hashedPassword } = user;
    if (!(await argon2.verify(hashedPassword, password))) {
      throw new ClientError(401, 'invalid login');
    }
    const payload = { userId, username };
    const token = jwt.sign(payload, hashKey);
    res.json({ token, user: payload });
  } catch (error) {
    next(error);
  }
});

app.post('/api/messages', async (req, res, next) => {
  try {
    const { userId, body } = req.body as { userId: number; body: string };
    const params = [userId, body];
    const sql = `
           INSERT into "messages" ("userId", "body")
           values ($1, $2)
           returning *
         `;
    const result = await db.query(sql, params);
    // io.emit('chat message', result.rows[0]);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

app.get('/api/messageLog', async (req, res, next) => {
  try {
    const sql = `
  SELECT
    "messages"."messageId",
    "messages"."body",
    "messages"."sentAt",
    "users"."username"
  from "messages" LEFT JOIN "users" USING ("userId")
  ORDER BY "messageId"
  `;
    const result = await db.query(sql);
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

/**
 * Serves React's index.html if no api route matches.
 *
 * Implementation note:
 * When the final project is deployed, this Express server becomes responsible
 * for serving the React files. (In development, the Vite server does this.)
 * When navigating in the client, if the user refreshes the page, the browser will send
 * the URL to this Express server instead of to React Router.
 * Catching everything that doesn't match a route and serving index.html allows
 * React Router to manage the routing.
 */
app.get('*', (_req, res) => res.sendFile(`${reactStaticDir}/index.html`));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
