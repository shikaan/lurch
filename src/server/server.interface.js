/**
 * @interface Server
 */
export default class Server {
    attachMiddleware() {
        throw Error('Not Implemented!')
    }

    attachRouter() {
        throw Error('Not Implemented!')
    }

    start() {
        throw Error('Not Implemented!')
    }
}