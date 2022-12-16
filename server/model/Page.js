import mongoose from "mongoose";
import slug from "mongoose-slug-generator";
import express from 'express';
const pageRoutes = express.Router();

const { Schema, SchemaTypes, model } = mongoose;

const options = {
    separator: "-",
    lang: false,
    symbols: false,
    truncate: 1
};

mongoose.plugin(slug, options);

const pageSchema = new Schema({
    title: {
        type: String, 
        required: true
    },
    slug: { 
        type: String, 
        slug: ["title"], 
        unique: true
    },
    meta_title: String,
    meta_canonical: String,
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    },
    updatedAt: Date,
    visible: {
        type: Boolean,
        default: false
    },
    hide: {
        type: Boolean,
        default: false
    },
    multiple: {
        type: Boolean,
        default: false
    },
    detail: {
        type: Boolean,
        default: false
    },
    landing: {
        type: Boolean,
        default: false
    },
    data: Object,
    content: [
        {
            type: SchemaTypes.ObjectId,
            ref: 'Block'
        }
    ]
});

pageSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Page = model("Page", pageSchema);

export default Page;
