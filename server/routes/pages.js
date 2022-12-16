import express from 'express';
import mongoose from "mongoose";
import Page from '../model/Page.js';
// const pageRoutes = express.Router();
const pageRoutes = express.Router();
pageRoutes.use(express.json());

// GET


// GET ALL PAGES
pageRoutes.get("/pages", async (req, res) => {
    const allPages = await Page.find();
    return res.status(200).json(allPages);
});

// GET ONE PAGE
pageRoutes.get("/pages/:id", async (req, res) => {
    const { id } = req.params;
    const page = await Page.findById(id).populate('content');
    return res.status(200).json(page);
});

// ADD
pageRoutes.post("/pages/add", async (req, res) => {
    const newPage = new Page({ ...req.body });
    const insertedPage = await newPage.save();
    return res.status(201).json(insertedPage);
});

// UPDATE
pageRoutes.put("/pages/update/:id", async (req, res) => {
    const { id } = req.params;
    await Page.updateOne({ id }, req.body);
    const updatedPage = await Page.findById(id);
    return res.status(200).json(updatedPage);
});

// UPDATE
pageRoutes.post("/pages/add-block/:id", async (req, res) => {
    const { id } = req.params;
    console.group(req.body);
    await Page.updateOne({ _id: id }, { $push: {content: req.body._id } });
    const updatedPage = await Page.findById(id);
    return res.status(200).json(updatedPage);
});

pageRoutes.post("/pages/remove-block/:id", async (req, res) => {
    const { id } = req.params;
    console.group(req.body);
    await Page.updateOne({ _id: id }, { $pull: {content: req.body._id } });
    const updatedPage = await Page.findById(id);
    return res.status(200).json(updatedPage);
});
  
// DELETE
pageRoutes.delete("pages/delete/:id", async (req, res) => {
    const { id } = req.params;
    const deletedPage = await Page.findByIdAndDelete(id);
    return res.status(200).json(deletedPage);
});



export default pageRoutes;