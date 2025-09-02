import express, { Express } from "express";
import * as http from "http";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import responseTime from 'response-time';
import path from "path";
import fs from 'fs';
import morgan from 'morgan';
require('dotenv').config();
var colors = require('colors');

colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
});


class server {
    private app: Express;
    private server: any;
    private port: number;

    constructor() {
        this.app = express();
        this.port = parseInt(`${process.env.PORT}`)
        this.server = http.createServer(this.app)
    }

    middleware() {
        this.app.use(cors({ origin: '*' }))
        this.app.use(cookieParser())
        this.app.use(responseTime())
    }

    settingPublicRoute() {
        const public_path = path.resolve(__dirname, '@/storage');
        this.app.use(express.static(public_path))
    }

    settingLogFile() {
        const logDir = path.join(__dirname, '/log')
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir)
        }

        const logFile = fs.createWriteStream(path.join(__dirname, '/log/request.log'), { flags: 'a' })
        this.app.use(morgan('combined', { stream: logFile }))
    }

    settingDataFormProcess() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json())
    }

    settingRoutes() {
        const router = require('./routes/routes')
        this.app.use('/', router)
    }

    execute() {
        this.middleware();
        this.settingPublicRoute();
        this.settingLogFile();
        this.settingDataFormProcess();
        this.settingRoutes()
        this.server.listen(this.port, () => {
            console.log(colors.error(`http://localhost:${this.port}`))
        })
    }
}

const Server = new server();

Server.execute();