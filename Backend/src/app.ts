import 'dotenv/config'
import './config/env'

import express from "express";
import type { Express } from "express"
import cors from 'cors';
import cookieParser from 'cookie-parser';
import responseTime from 'response-time';
import path from "path";
import fs from 'fs';
import morgan from 'morgan';

import { globalLimiter } from "./middleware/rateLimiter.middleware";
import router from './routes/routes'
import { errorHandler } from "./middleware/errorHandler.middleware";

export const createApp = (): Express => {
    const app = express();

    const allowedOrigins = process.env.ALLOWED_ORIGINS
        ?.split(',')
        .map(origin => origin.trim())
        .filter(Boolean)
        ?? ['http://localhost:5173']

    // CORS
    if (process.env.NODE_ENV === 'test') {
        app.use(cors())
    } else {
        app.use(cors({
            origin: (origin, callback) => {
                if (!origin || allowedOrigins.includes(origin)) {
                    callback(null, true)
                } else {
                    callback(new Error('Not allowed by CORS'))
                }
            },
            credentials: true,
        }))
    }

    app.use(cookieParser())
    app.use(responseTime())

    // Rate limiter (desactivado en test)
    if (process.env.NODE_ENV !== 'test') {
        app.use(globalLimiter)
    }

    // Static files
    const publicPath = path.resolve(__dirname, '../uploads');
    app.use("/uploads", express.static(publicPath))

    // Logs (desactivado en test)
    if (process.env.NODE_ENV !== 'test') {
        const logDir = path.join(__dirname, '../log')
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir)
        }

        const logFile = fs.createWriteStream(
            path.join(__dirname, '../log/request.log'),
            { flags: 'a' }
        )

        app.use(morgan('combined', { stream: logFile }))
    }

    // Body parsers
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json())

    // Routes
    app.use('/api', router)
    app.use(errorHandler)

    // Health check
    app.get("/", (req, res) => {
        res.json({
            api: "Blog",
            status: "Ok"
        })
    });

    return app;
}