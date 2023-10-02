import express from 'express';
import authentication from './authentication';
import document from './document';

const router = express.Router()

export default () : express.Router => {
    authentication(router)
    document(router)
    return router
}