import {pbkdf2 as asyncPbkdf2 } from 'crypto';
import {promisify} from 'util';

const pbkdf2 = promisify(asyncPbkdf2);

export const encryptPassword = async (password) => {
    return (await pbkdf2(password, process.env.CRYPTO_SALT, 1000000, 16, 'sha1')).toString('base64')
};
