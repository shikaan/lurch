/**
 * @return {RequestHandler}
 */
export default (logger) =>
    /**
     * @param {Exception} error
     * @param {Request} req
     * @param {Response} res
     * @param next
     */
        (error, req, res, next) => {
            if (error) {
                logger.error(error);
                res.status(error.statusCode).send(error.message)
            } else {
                next()
            }
        };
