import {join} from 'path';
import express from 'express';

const app = express()

app.use('/', express.static(join(__dirname, 'public')))

app.listen('9090', () => {
    console.log('App started on 9090')
})