import UserDTO from "./user.dto";
import {createToken, encryptPassword} from "~utils";

export default class UsersController {
    /**
     * @param {UsersRepository} repository
     * @param {Logger} logger
     */
    constructor(repository, logger) {
        this.repository = repository;
        this._logger = logger;
    }

    findAll() {
        return this.repository.findAll()
    }

    findById(id) {
        return this.repository.findById(id)
    }

    async register(body) {
        const password = encryptPassword(body.password);
        const userData = new UserDTO(body.username, password);
        const user = await this.repository.save(userData);
        const token = createToken(user, process.env.JWT_SECRET);

        return { user, token };
    }

    async login(body) {
        const userData = new UserDTO(body.username);

        const user = await this.repository.findByUsername(userData.username);
        const password = encryptPassword(body.password);

        if (password !== user.password) {
            // TODO: make me pretty
            throw new Error('Unauthrized');
        }

        const token = createToken(user, process.env.JWT_SECRET);

        return { user, token };
    }
}
