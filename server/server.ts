import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import { ClientError, errorMiddleware } from './lib/index.js';
import { Server } from 'socket.io';
import cors from 'cors';
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

const hashKey = process.env.TOKEN_SECRET;
if (!hashKey) throw new Error('TOKEN_SECRET not found in .env');

const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DB_NAME}`;
const db = new pg.Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();
const httpServer = app.listen(process.env.PORT, () => {
  console.log(`\n\n app listening on port ${process.env.PORT}\n\n`);
});

// connect server for socket + data handling
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('chat message', (data) => {
    io.emit('server response', data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// static images (dark/light logos)
const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(cors());
app.use(express.static(reactStaticDir));

app.use(express.static(uploadsStaticDir));
app.use(express.json());

// app.get('/api/test', (req, res) => {
//   res.json({ httpserver: httpServer, serverport: process.env.PORT });
// });

// GET trending GIFs (limited to 16)
app.get('/api/gifs/trending', async (req, res, next) => {
  try {
    const trendingGifs = await fetch(
      `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.GIPHY_API_KEY}&limit=16`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const result = await trendingGifs.json();
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// GET searched GIFs (limited to 16)
app.get('/api/gifs/search', async (req, res, next) => {
  try {
    const q = req.query.q as string;
    if (q?.length < 1) throw new ClientError(401, 'query cannot be empty');
    const searchedGifs = await fetch(
      `https://api.giphy.com/v1/gifs/search?q=${q}&api_key=${process.env.GIPHY_API_KEY}&limit=16`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const result = await searchedGifs.json();
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// POST sign up into DB
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

// POST signing into chatroom
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

// POST new messages
app.post('/api/messages', async (req, res, next) => {
  try {
    const { userId, body, isGif } = req.body as {
      userId: number;
      body: string;
      isGif: boolean;
    };
    const params = [userId, body, isGif];
    const sql = `
           INSERT into "messages" ("userId", "body", "isGif")
           values ($1, $2, $3)
           returning *
         `;
    await db.query(sql, params);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

// GET chat history
app.get('/api/messageLog', async (req, res, next) => {
  try {
    const sql = `
  SELECT
    "messages"."messageId",
    "messages"."body",
    "messages"."sentAt",
    "messages"."isGif",
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

app.get('*', (_req, res) => res.sendFile(`${reactStaticDir}/index.html`));

app.use(errorMiddleware);
