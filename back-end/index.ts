import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

//Import Routes

import getRoutes from './routes/gets/getDataRoutes'

dotenv.config()
const app = express();
 app.use(cors());
 app.use(bodyParser.json({limit: '120kb'}));
 app.use(bodyParser.urlencoded({limit: '120kb', extended: true}));


 app.use('/API/', getRoutes);

 let PORT = process.env.PORT || 8000;

 app.listen(PORT)