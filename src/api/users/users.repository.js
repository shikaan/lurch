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
        this.logger = logger;
        this.collection = COLLECTION.USERS;
    }

    async findAll() {
        const users = await this.databaseClient.findAll(this.collection);

        return Object.entries(users).map(([id, user]) => User.fromDTO(user, id))
    }

    async find (id) {
        const user = await this.databaseClient.find(this.collection, id);

        return User.fromDTO(user, id);
    }

    /**
     *
     * @param {UserDTO} user
     * @return {Promise<User>}
     */
    async save(user) {
        const id = await this.databaseClient.save(this.collection, user);

        return User.fromDTO(user, id);
    }
}
