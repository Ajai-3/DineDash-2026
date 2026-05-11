import app from './app';
import http from 'http';
import { env } from './infrastructure/config/env';
import { connectDB } from './infrastructure/database/db';

const port = env.port;
const server = http.createServer(app);

const startServer = async () => {
  await connectDB();

  server.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
};

startServer();
