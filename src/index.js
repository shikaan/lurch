import {json} from 'express'
import cookieParser from 'cookie-parser'

import Logger, {LOG_LEVEL} from './logger'
import {ExpressRouter, ExpressServer, METHODS} from './server'

import {UsersController, UsersRepository} from "~api/users";
import {URLsController} from "~api/urls";
import FirebaseDatabaseClient, {COLLECTION} from "~database/firebase.client";
import verifyJwt from '~middlewares/verify-jwt.middleware'

const logger = new Logger(LOG_LEVEL.INFO);

const server = new ExpressServer();
const apiRouter = new ExpressRouter('/api');

server.attachMiddleware(json());
server.attachMiddleware(cookieParser());

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
        '/users/:id',
        METHODS.GET,
        async (req, res, next) => {
            try {
                res.json(await usersController.findById(req.params.id));
            } catch (e) {
                next(e)
            }
        });

apiRouter
    .attachHandler(
        '/users/registration',
        METHODS.POST,
        async (req, res, next) => {
            try {
                const {user, token} = await usersController.register(req.body);

                res.cookie('auth_token', token, {httpOnly: true});
                res.json(user);

            } catch (e) {
                next(e)
            }
        });

apiRouter
    .attachHandler(
        '/users/login',
        METHODS.POST,
        async (req, res, next) => {
            try {
                const {user, token} = await usersController.login(req.body);

                res.cookie('auth_token', token, {httpOnly: true});
                res.json(user);

            } catch (e) {
                next(e)
            }
        });

apiRouter
    .attachMiddleware(verifyJwt(process.env.JWT_SECRET))
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
