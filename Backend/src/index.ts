import 'dotenv/config';
import './config/env';
import http from "http";
import { createApp } from './app';
import { logger } from './utils/logger';

const port = parseInt(process.env.PORT || '4000');
const app = createApp();
const httpServer = http.createServer(app);

httpServer.listen(port, () => {
    const url = `http://localhost:${port}`;
    logger.info(
        { port, url },
        "🚀 Server started successfully",
    );
});