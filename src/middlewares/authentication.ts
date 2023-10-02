import express from 'express';
import jwt from 'jsonwebtoken';

declare global {
    namespace Express {
      interface Request {
        user: any;
        token: any; // You can replace 'any' with the actual type of 'user' if known
      }
    }
  }
export const auth = (req: express.Request, res: express.Response , next: express.NextFunction) =>{
    try{
        const token = req.header('auth-token')

        if(!token) return res.status(401).json({msg: "No Auth token, access denied"});

        const verified = jwt.verify(token, "Hitesh is Great");

        if(!verified) return res.status(401).json({msg: "Token verification failed, authorization denied."}); 
        
        req.user = verified;
        req.token = token;

        return next()

    } catch(error){
        return res.status(500).json({error: error.message})
    }
}