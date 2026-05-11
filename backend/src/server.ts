import app from './app';
import http from 'http';
import { env } from './infrastructure/config/env';
import { connectDB } from './infrastructure/database/db';
import logger from './infrastructure/logging/logger';

const port = env.port;
const server = http.createServer(app);

const startServer = async () => {
  await connectDB();

  server.listen(port, () => {
    logger.info(`server running on port ${port}`);
  });
};

startServer();
