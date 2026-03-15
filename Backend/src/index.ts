import * as express from "express";
import type { Express } from "express"
import * as http from "http";
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as responseTime from 'response-time';
import * as path from "path";
import * as fs from 'fs';
import * as morgan from 'morgan';
import { globalLimiter } from "./middleware/rateLimiter.middleware";
import 'dotenv/config'
import * as colors from 'colors'
import router from './routes/routes'

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
        const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173']
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
        this.app.use('/', router)
    }

    start() {
        this.middleware();
        this.settingPublicRoute();
        this.settingLogFile();
        this.settingDataFormProcess();
        this.settingRoutes()
        this.httpServer.listen(this.port, () => {
            console.log(colors.rainbow(`http://localhost:${this.port}`))
        })
    }
}

const app = new App()
app.start()