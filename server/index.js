import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
// import fs from 'fs';
// import path from 'path';
// import * as Routes from './routes/index.js';
import pageRoutes from './routes/pages.js';
import blockRoutes from './routes/blocks.js';
import Page from './model/Page.js';
import Block from './model/Block.js';
import * as dotenv from 'dotenv';


dotenv.config({ path: "./config.env" });

const {ATLAS_URI, PORT} = process.env;

mongoose.set('strictQuery', false);

const app = express();

app.use(express.json());
app.use(cors());
app.use(pageRoutes);
app.use(blockRoutes);


const start = async () => {
  try {
    await mongoose.connect(
        ATLAS_URI
    );
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
   
    

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};






start();

// const routesDirectory = path.resolve('./') + '/routes/'; 
// console.log(routesDirectory);
// fs.readdirSync(routesDirectory).forEach(routeFile => {
//     try {
//       app.use('/', require(routesDirectory + routeFile)());
//     } catch (error) {
//       console.log(`Encountered Error initializing routes from ${routeFile}`);
//       console.log(error);
//     }
// });
