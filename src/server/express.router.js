import {Router as createRouter} from 'express'

import Router, {METHODS} from './router.interface'

export default class ExpressRouter extends Router {
    constructor(route) {
        super();
        this._route = route;
        this._router = createRouter()
    }

    get router() {
        return this._router
    }

    /**
     * @param {string} route
     * @param {string} method
     * @param {RequestHandler} handler
     * @return {Router}
     */
    attachHandler(route, method, handler) {
        if (!Object.values(METHODS).includes(method)) {
            throw TypeError(`Method should be one of ${METHODS.join()}, Got: ${method}`)
        }

        this._router[method](`${this._route}${route}`, handler);

        return this
    }

    /**
     * @param {RequestHandler} middleware
     */
    attachMiddleware(middleware) {
        this._router.use(middleware)

        return this
    }
}
