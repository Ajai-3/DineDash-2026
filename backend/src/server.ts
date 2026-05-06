import app from './app';
import http from 'http';

const port = 6000;

const server = http.createServer(app);

server.listen(() => {
    console.log("server running")
})


