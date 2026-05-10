import app from './app';
import http from 'http';
import { env } from './infrastructure/config/env';

const port = env.port;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`server running on port ${port}`);
});
