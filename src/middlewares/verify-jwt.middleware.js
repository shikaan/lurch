import {promisify} from 'util'

import {verify as asyncVerify} from 'jsonwebtoken'
import {UnauthorizedException} from "~exceptions";


const verify = promisify(asyncVerify);

export default ({secret}) =>
    /**
     *
     * @param {Request} req
     * @param {Response} res
     * @param {function} next
     */
    async ({cookies = {}}, res, next) => {
        const {auth_token: token} = cookies;

        try {
            await verify(token, process.env.JWT_SECRET);
            next()
        } catch (e) {
            next(new UnauthorizedException(e.message))
        }
    }
