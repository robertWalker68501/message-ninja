import express from 'express';
import cors from 'cors';
import dns from 'node:dns';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';

import { clerkMiddleware } from '@clerk/express';
import { connectDB } from './lib/db.js';

const app = express();

dns.setServers(['8.8.8.8', '8.8.4.4']);

const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

const publicDir = path.join(process.cwd(), 'public');

// Middlewares
app.use(express.json());
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(clerkMiddleware());

app.get('/health', (req, res) => {
  res.status(200).json({ ok: true });
});

// if the public directory exists, serve the static files
// this is for production build
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));

  app.get('/{*any}', (req, res, next) => {
    res.sendFile(path.join(publicDir, 'index.html'), (err) => next(err));
  });
}

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log('Server is up and running on port: ', PORT);
  });
}

startServer();
