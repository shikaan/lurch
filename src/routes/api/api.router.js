import {ExpressRouter, METHODS} from "~server";
import FirebaseDatabaseClient, {COLLECTION} from "~database/firebase.client";
import {UsersController, UsersRepository} from "~api/users";
import {URLsController} from "~api/urls";
import {verifyJWT} from '~middlewares';

export const getApiRouter = (logger) => {
    const apiRouter = new ExpressRouter('/api');
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
        .attachMiddleware(verifyJWT(process.env.JWT_SECRET))
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

    return apiRouter
};
