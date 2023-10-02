import { auth } from '../middlewares/authentication';
import { getData, register } from '../controllers/authentication';
import express from 'express';

export default (router: express.Router) =>{
    router.post('/api/register', register)
    router.get('/api/getData', auth,getData);
}