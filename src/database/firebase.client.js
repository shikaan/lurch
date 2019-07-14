import fs from 'fs';

import firebase from 'firebase-admin';
import DatabaseClient from "./client.interface";
import User from "~api/users/user.model";

export const COLLECTION = {
    USERS: 'users'
};

const COLLECTIONS = Object.values(COLLECTION);

export default class FirebaseDatabaseClient extends DatabaseClient {
    constructor(collection, logger) {
        super();
        const firebaseAuth = FirebaseDatabaseClient._getConfiguration();

        const application = firebase.initializeApp({
            credential: firebase.credential.cert(firebaseAuth),
            databaseURL: process.env.FIREBASE_DATABASE_URL
        });

        this._client = application.database();
        this._logger = logger;
    }

    async find(collection, id) {
        if (!COLLECTIONS.includes(collection)) {
            throw new TypeError(`Collection should be one of ${COLLECTIONS.join()}. Got: ${collection}`)
        }

        const ref = this._client.ref(`${collection}/${id}`);
        const dataSnapshot = await ref.once('value');

        if (!dataSnapshot.exists()) {
            throw new ReferenceError(`Unable to find any item in collection ${collection}`)
        }

        return dataSnapshot.toJSON()
    }

    async findAll(collection) {
        if (!COLLECTIONS.includes(collection)) {
            throw new TypeError(`Collection should be one of ${COLLECTIONS.join()}. Got: ${collection}`)
        }

        const ref = this._client.ref(collection);
        const dataSnapshot = await ref.once('value');

        if (!dataSnapshot.exists()) {
            throw new ReferenceError(`Unable to find any item in collection ${collection}`)
        }

        return dataSnapshot.toJSON()
    }

    /**
     * @param {string} collection
     * @param {UserDTO} user
     */
    async save(collection, user) {
        const ref = this._client.ref(collection);

        const {key: id} = await ref.push(user);

        return id
    }

    static _getConfiguration() {
        return JSON.parse(fs.readFileSync(process.env.FIREBASE_AUTH_JSON))
    }
}
