import {json} from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import {Logger, LOG_LEVEL} from '~utils'
import {ExpressServer} from '~server'
import {getApiRouter} from "~api";
import {errorMiddleware} from "~middlewares";

const logger = new Logger(LOG_LEVEL.INFO);

const server = new ExpressServer();

server.attachMiddleware(cors({ origin: true, credentials: true }));
server.attachMiddleware(json());
server.attachMiddleware(cookieParser());

server.attachRouter(getApiRouter(logger));

server.attachMiddleware(errorMiddleware(logger));

server.start({port: process.env.PORT}, () => {
    logger.info(`Started localhost@${process.env.PORT}`)
});
