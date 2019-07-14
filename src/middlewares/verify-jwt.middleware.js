import {promisify} from 'util'

import {verify as asyncVerify} from 'jsonwebtoken'


const verify = promisify(asyncVerify);

export default ({secret}) =>
    /**
     *
     * @param {Request} req
     * @param {Response} res
     * @param {function} next
     */
    async (req, res, next) => {
        const token = req.cookies.auth_token;

        if (!token) {
            // I can be better
            next(new Error('Unauthorized'))
        }

        try {
            await verify(token, process.env.JWT_SECRET);
            next()
        } catch (e) {
            next(e)
        }
    }
