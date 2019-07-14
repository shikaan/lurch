export const METHODS = {
    GET: 'get',
    POST: 'post',
    PATCH: 'patch',
    PUT: 'put',
    DELETE: 'delete',
    HEAD: 'head',
    OPTIONS: 'options'
};

/**
 * @interface Router
 */
export default class Router {
    get router () {
        throw Error('Not Implemented!')
    }

    attachHandler() {
        throw Error('Not Implemented!')
    }
}
