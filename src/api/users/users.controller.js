import UserDTO from "~api/users/user.dto";

export default class UsersController {
    /**
     * @param {UsersRepository} repository
     * @param {Logger} logger
     */
    constructor(repository, logger) {
        this.repository = repository;
        this.logger = logger;
    }

    findAll() {
        return this.repository.findAll()
    }

    find(id) {
        return this.repository.find(id)
    }

    save(body) {
        const user = new UserDTO(body.username, body.password);

        return this.repository.save(user);
    }
}
