import { Console } from 'console'

export const LOG_LEVEL = {
    ERROR: 0,
    WARNING: 1,
    INFO: 2,
    VERBOSE: 3,
    DEBUG: 4,
    SILLY: 5
};

const LOG_LEVEL_NAMES = Object.keys(LOG_LEVEL);
const LOG_LEVELS = Object.values(LOG_LEVEL);
const DEFAULT_OPTIONS = { stdout: process.stdout, stderr: process.stderr, colorMode: true };

export default class Logger {
    constructor(rawLevel = LOG_LEVEL.INFO, options = DEFAULT_OPTIONS, logger = new Console(DEFAULT_OPTIONS)) {
        const level = Number.parseInt(rawLevel);

        if (LOG_LEVEL_NAMES.includes(rawLevel)) {
            this.level = LOG_LEVEL[rawLevel]
        } else if (LOG_LEVELS.includes(level)) {
            this.level = level
        } else {
            throw new TypeError(`Unable to recognize level ${rawLevel}`)
        }

        this._logger = logger || new Console(options)
    }

    error(...args) {
        this._logger.log('[ERROR]:', ...args)
    }

    warning(...args) {
        if (this.level >= LOG_LEVEL.WARNING)
            this._logger.log('[WARNING]:', ...args)
    }

    info(...args) {
        if (this.level >= LOG_LEVEL.INFO)
            this._logger.log('[INFO]:', ...args)
    }

    verbose(...args) {
        if (this.level >= LOG_LEVEL.VERBOSE)
            this._logger.log('[VERBOSE]:', ...args)
    }

    debug(...args) {
        if (this.level >= LOG_LEVEL.DEBUG)
            this._logger.log('[DEBUG]:', ...args)
    }

    silly(...args) {
        if (this.level >= LOG_LEVEL.SILLY)
            this._logger.log('[SILLY]:', ...args)
    }

    log(...args) {
        this._logger.log(...args)
    }
}
