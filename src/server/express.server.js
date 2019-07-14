import createApplication from 'express'
import Server from './server.interface'

export default class ExpressServer extends Server {
    constructor() {
        super();
        this._server = createApplication()
    }

    get server() {
        return this._server
    }

    /**
     * @param {RequestHandler} middleware
     */
    attachMiddleware(middleware) {
        this._server.use(middleware)
    }

    /**
     * @param {ExpressRouter} router
     */
    attachRouter(router) {
        this._server.use(router.router)
    }

    /**
     * @param {{port: number}} opts
     * @param {Function} callback
     */
    start(opts, callback) {
        this._server.listen(opts.port, callback)
    }
}
