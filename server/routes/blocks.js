import express from 'express';
import mongoose from "mongoose";
import Block from '../model/Block.js';
// const blockRoutes = express.Router();
const blockRoutes = express.Router();
blockRoutes.use(express.json());


// GET ALL BlockS
blockRoutes.get("/blocks", async (req, res) => {
    const allBlocks = await Block.find();
    return res.status(200).json(allBlocks);
});

// GET ONE Block
blockRoutes.get("/blocks/:id", async (req, res) => {
    const { id } = req.params;
    const block = await Block.findById(id);
    return res.status(200).json(block);
});

// ADD
blockRoutes.post("/blocks/add", async (req, res) => {
    const newBlock = new Block({ ...req.body });
    const insertedBlock = await newBlock.save();
    console.log(insertedBlock._id);
    return res.status(201).json(insertedBlock);
});

// UPDATE
blockRoutes.put("/blocks/update/:id", async (req, res) => {
    const { id } = req.params;
    await Block.updateOne({ id }, req.body);
    const updatedBlock = await Block.findById(id);
    return res.status(200).json(updatedBlock);
});
  
// DELETE
blockRoutes.delete("/blocks/delete/:id", async (req, res) => {
    const { id } = req.params;
    const deletedBlock = await Block.findByIdAndDelete(id);
    return res.status(200).json(deletedBlock);
});



export default blockRoutes;