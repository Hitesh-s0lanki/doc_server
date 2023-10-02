import mongoose from "mongoose";

export default function connectDB(MONGO_URL:string){
    mongoose.Promise = Promise;
    mongoose.connect(MONGO_URL)
    console.log("connected to DB")
    mongoose.connection.on('error', (error: Error) => console.log(error))
}
