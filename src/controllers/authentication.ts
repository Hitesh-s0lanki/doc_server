import { createUser, getUserByEmail, getUserById } from '../db/users';
import express from 'express';

import jwt from 'jsonwebtoken';

export const register = async(req: express.Request, res: express.Response) => {
    try{
        const { name , email , profilePic } = req.body;
        
        const existingUser = await getUserByEmail(email)

        if(existingUser){
            const token = jwt.sign({id: existingUser._id}, "Hitesh is Great");
            return res.status(200).json({user:existingUser, token})
        }

        const user = await createUser({name , email, profilePic})

        const token = jwt.sign({id: user._id}, "Hitesh is Great");
        
        return res.status(200).json({user, token})

    }catch(error){
        return  res.status(500).json({error: error.message})
    }
}

export const getData = async(req: express.Request, res: express.Response) => {
    try{
        const user = await getUserById(req.user!.id)
        return res.status(200).json({user, token: req.token})
    }catch(error){
        return  res.status(500).json({error: error.message})
    }
}