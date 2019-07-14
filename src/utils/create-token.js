import {sign} from 'jsonwebtoken'

export const createToken = (data, secret) => {
    const dataPojo = JSON.parse(JSON.stringify(data));
    return sign(dataPojo, secret)
};
