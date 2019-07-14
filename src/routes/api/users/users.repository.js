import {COLLECTION} from "~database/firebase.client";
import User from "~api/users/user.model";

export default class UsersRepository {
    /**
     *
     * @param {DatabaseClient} databaseClient
     * @param {Logger} logger
     */
    constructor(databaseClient, logger) {
        this.databaseClient = databaseClient;
        this._logger = logger;
        this.collection = COLLECTION.USERS;
    }

    async findAll() {
        const users = await this.databaseClient.findAll(this.collection);

        return Object.entries(users).map(([id, user]) => User.fromDTO(user, id))
    }

    async findById (id) {
        const user = await this.databaseClient.findById(this.collection, id);

        return User.fromDTO(user, id);
    }

    async findByUsername (username) {
        const users = await this.databaseClient.findByField(this.collection, 'username', username);

        return Object.entries(users).map(([id, user]) => User.fromDTO(user, id))[0]
    }

    /**
     *
     * @param {UserDTO} userData
     * @return {Promise<User>}
     */
    async save(userData) {
        const id = await this.databaseClient.save(this.collection, userData);

        return User.fromDTO(userData, id);
    }
}
