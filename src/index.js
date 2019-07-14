import {json} from 'express'

import Logger, {LOG_LEVEL} from './logger'
import {ExpressRouter, ExpressServer, METHODS} from './server'

import {UsersController, UsersRepository} from "~api/users";
import FirebaseDatabaseClient, {COLLECTION} from "~database/firebase.client";
import {URLsController} from "~api/urls";

const logger = new Logger(LOG_LEVEL.INFO);

const server = new ExpressServer();
const apiRouter = new ExpressRouter('/api');

server.attachMiddleware(json());

const firebaseDatabaseClient = new FirebaseDatabaseClient(COLLECTION.USERS, logger);
const usersRepository = new UsersRepository(firebaseDatabaseClient, logger);
const usersController = new UsersController(usersRepository, logger);

const urlsController = new URLsController();

apiRouter
    .attachHandler(
        '/users',
        METHODS.GET,
        async (req, res, next) => {
            try {
                res.json(await usersController.findAll());
            } catch (e) {
                next(e)
            }
        });

apiRouter
    .attachHandler(
        '/users',
        METHODS.POST,
        async (req, res, next) => {
            try {
                res.json(await usersController.save(req.body));
            } catch (e) {
                next(e)
            }
        });

apiRouter
    .attachHandler(
        '/users/:id',
        METHODS.GET,
        async (req, res, next) => {
            try {
                res.json(await usersController.find(req.params.id));
            } catch (e) {
                next(e)
            }
        });

apiRouter
    .attachHandler(
        '/urls',
        METHODS.GET,
        async (req, res, next) => {
            try {
                res.json(await urlsController.findAll());
            } catch (e) {
                next(e)
            }
        }
    );

apiRouter
    .attachHandler(
        '/urls',
        METHODS.POST,
        async (req, res, next) => {
            try {
                res.json(await urlsController.save(req.body));
            } catch (e) {
                next(e)
            }
        }
    );

server.attachRouter(apiRouter);

server.start({port: process.env.PORT}, () => {
    logger.info(`Started localhost@${process.env.PORT}`)
});
