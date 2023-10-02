import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    profilePic:{
        type: String,
        required: true
    }
});

export const User = mongoose.model("User", userSchema)

export const getUsers = () => User.find()
export const getUserByEmail = (email: string) => User.findOne({ email })
export const getUserById = (id : string) => User.findById(id)
export const createUser = (values: Record<string, any>) => new User(values).save().then((user) => user.toObject())

