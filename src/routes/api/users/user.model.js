export default class User {
    constructor(id, username, password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }

    /**
     *
     * @param {UserDTO} user
     * @param {string} id
     * @return {User}
     */
    static fromDTO(user, id) {
        return new User(id, user.username, user.password);
    }

    static fromCollectionEntry(collectionEntry) {

    }
}
