import fs from 'fs';

import firebase from 'firebase-admin';
import DatabaseClient from "./client.interface";

export const COLLECTION = {
    USERS: 'users'
};

export const INDEXED_KEYS = {
    [COLLECTION.USERS]: ['username']
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

    async findById(collection, id) {
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

    async findByField(collection, key, value) {
        if (!COLLECTIONS.includes(collection)) {
            throw new TypeError(`Collection should be one of ${COLLECTIONS.join()}. Got: ${collection}`)
        }

        if (!INDEXED_KEYS[collection].includes(key)) {
            throw new TypeError(`Key should be one of ${INDEXED_KEYS[collection].join()}. Got: ${key}`)
        }

        const ref = this._client.ref(`${collection}`).orderByChild(key).limitToFirst(1);
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
