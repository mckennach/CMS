import mongoose from "mongoose";
const { Schema, model } = mongoose;

const blockSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    slug: { 
        type: String, 
        slug: ["name"], 
        unique: true
    },
    type: {
        type: String, 
        required: true,
        default: 'Plain Text'
    },
    content: {
        type: Object
    }
});

const Block = model("Block", blockSchema);

export default Block;
