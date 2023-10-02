import { createDocument, getAllDocument, getDocumentData, updateTitle } from '../controllers/document';
import express from 'express';
import { auth } from '../middlewares/authentication';

export default (router: express.Router) =>{
    router.post('/doc/create', auth, createDocument)
    router.get('/doc/me', auth , getAllDocument)
    router.post('/doc/title', auth , updateTitle)
    router.get('/doc/:id', auth , getDocumentData)
}