import {json} from 'express'
import cookieParser from 'cookie-parser'

import {Logger, LOG_LEVEL} from '~utils'
import {ExpressServer} from '~server'
import {getApiRouter} from "~api";

const logger = new Logger(LOG_LEVEL.INFO);

const server = new ExpressServer();

server.attachMiddleware(json());
server.attachMiddleware(cookieParser());

server.attachRouter(getApiRouter(logger));

server.start({port: process.env.PORT}, () => {
    logger.info(`Started localhost@${process.env.PORT}`)
});
