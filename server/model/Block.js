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
    typeSlug: {
        type: String, 
        slug: ["type"], 
        unique: true
    },
    content: {
        type: Object,
        required: true
    }
});

const Block = model("Block", blockSchema);

export default Block;
