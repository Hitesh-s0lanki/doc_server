import express from "express";
import cors from "cors";
import http from "http";
import bodyParser from "body-parser";
import compression from "compression";
import router from './routes';
import connectDB from './db';

import * as socketio from "socket.io";
import { DocumentModel } from "./db/document";

const app = express()

app.use(cors({
    credentials: true
}))

app.use(compression())
app.use(bodyParser.json())

const server = http.createServer(app)
const PORT = process.env.PORT || 5000

connectDB("mongodb+srv://hiteshsolanki4623:hitesh123@tictactoe.2ge3fq7.mongodb.net/docs?retryWrites=true&w=majority")

server.listen(PORT, () =>{
    console.log(`Connected to the port ${PORT}`)
})

app.use('/',router())


const io = require("socket.io")(server);

const saveData = async (data: any) =>{
    let document = await DocumentModel.findById(data.room);
    document.content = data.delta;
    document = await document.save()
}


io.on('connection',(socket : any)=>{
    socket.on('join', (documentId: String) =>{
        socket.join(documentId);
    })

    socket.on('typing', (data: any) =>{
        socket.broadcast.to(data.room).emit('changes', data)
    })

    socket.on('save', (data: any) =>{
        saveData(data);
    })
})
