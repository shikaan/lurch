import {STATUS_CODES} from 'http'

import Exception from "./exception.interface";

const STATUS_CODE = '401';

export default class UnauthorizedException extends Exception {
    constructor(message = STATUS_CODES[STATUS_CODE]) {
        super(STATUS_CODE, message);
    }
}
