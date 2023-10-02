import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
    uid: {
        type: String,
        required:true
    },
    createdAt: {
        required:true,
        type: Number
    },
    title:{
        required:true,
        type: String,
        trim:true
    },
    content:{
        type:Array,
        default:[]
    }
});

export const DocumentModel = mongoose.model("Document", documentSchema);

export const createDoc = (values: Record<string, any>) => new DocumentModel(values).save().then((user) => user.toObject())
export const getAllDocumentById = (id: String) => DocumentModel.find({uid:id})
export const getDocumentById = (id:String) => DocumentModel.findById(id)
