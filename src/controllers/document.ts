import { createDoc, getAllDocumentById, DocumentModel, getDocumentById } from '../db/document';
import express from 'express';

export const createDocument = async(req: express.Request, res: express.Response) =>{
    try{
        const { createdAt } = req.body;

        const document = await createDoc({
            uid: req.user.id,
            title:"Untitled Document",
            createdAt,
        })

        res.status(200).json(document)

    }catch(error){
        console.log(error)
        res.status(500).json({ error: error.message})
    }
}

export const getAllDocument = async(req: express.Request, res: express.Response) =>{
    try{
        const document = await getAllDocumentById(req.user.id);
        res.status(200).json(document)
    } catch(error) {
        res.status(500).json({ error: error.message}) 
    }
}

export const updateTitle = async(req: express.Request, res: express.Response) =>{
    try{
        const { id , title } = req.body;
        let document = await DocumentModel.findByIdAndUpdate(id, {title});

        res.json(document)
    } catch(error) {
        res.status(500).json({ error: error.message}) 
    }
}

export const getDocumentData = async(req: express.Request, res: express.Response) =>{
    try{
        const document = await getDocumentById(req.params.id);
        res.status(200).json(document)
    }catch(error){
        res.status(500).json({ error: error.message}) 
    }
}
