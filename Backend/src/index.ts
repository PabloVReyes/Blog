import 'dotenv/config'
import './config/env'
import express from "express";
import type { Express } from "express"
import http from "http";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import responseTime from 'response-time';
import path from "path";
import fs from 'fs';
import morgan from 'morgan';
import { globalLimiter } from "./middleware/rateLimiter.middleware";
import chalk from 'chalk'
import router from './routes/routes'
import { errorHandler } from "./middleware/errorHandler.middleware";
import { logger } from './utils/logger';

const colors = [
    'red',
    'green',
    'yellow',
    'blue',
    'magenta',
    'cyan',
] as const;

export const randomColor = (text: string) => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    return chalk[color!](text);
};

class App {
    private app: Express;
    private httpServer: http.Server
    private port: number;

    constructor() {
        this.app = express();
        this.port = parseInt(`${process.env.PORT}`)
        this.httpServer = http.createServer(this.app)
    }

    middleware() {
        const allowedOrigins = process.env.ALLOWED_ORIGINS
            ?.split(',')
            .map(origin => origin.trim())
            .filter(Boolean)
            ?? ['http://localhost:5173']

        this.app.use(cors({
            origin: (origin, callback) => {
                if (!origin || allowedOrigins.includes(origin)) {
                    callback(null, true)
                } else {
                    callback(new Error('Not allowed by CORS'))
                }
            },
            credentials: true,
        }))

        this.app.use(cookieParser())
        this.app.use(responseTime())
        this.app.use(globalLimiter)
    }

    settingPublicRoute() {
        const public_path = path.resolve(__dirname, '../uploads');
        this.app.use("/uploads", express.static(public_path))
    }

    settingLogFile() {
        const logDir = path.join(__dirname, '../log')
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir)
        }

        const logFile = fs.createWriteStream(path.join(__dirname, '../log/request.log'), { flags: 'a' })
        this.app.use(morgan('combined', { stream: logFile }))
    }

    settingDataFormProcess() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json())
    }

    settingRoutes() {
        this.app.use('/api', router)
        this.app.use(errorHandler)
    }

    start() {
        this.middleware();
        this.settingPublicRoute();
        this.settingLogFile();
        this.settingDataFormProcess();
        this.settingRoutes()

        this.app.get("/", (req, res) => {
            res.json({
                api: "Blog",
                status: "Ok"
            })
        });

        this.httpServer.listen(this.port, () => {
            const url = `http://localhost:${this.port}/api`

            logger.info(
                { port: this.port },
                "Server started"
            );

            if (process.env.NODE_ENV !== 'production') {
                console.log(randomColor(url));
            }
        });
    }
}

const app = new App()
app.start()