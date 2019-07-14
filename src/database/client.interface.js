/**
 * @interface DatabaseClient
 */
export default class DatabaseClient {
    get collection() {
        throw Error('Not implemented!')
    }

    /**
     * @param {string} collection
     *
     * @return {object<{string: object}>}
     */
    findAll(collection) {
        throw Error('Not implemented!')
    }

    /**
     * @param {string} collection
     * @param {string} id
     *
     * @return {object<{string: object}>}
     */
    findById(collection, id) {
        throw Error('Not implemented!')
    }

    /**
     * @param {string} collection
     * @param {string} key
     * @param {string} value
     *
     * @return {object<{string: object}>}
     */
    findByField(collection, key, value) {
        throw Error('Not implemented!')
    }

    /**
     * @param {string} collection
     *
     * @return {object}
     */
    save(collection) {
        throw Error('Not implemented!')
    }
}
