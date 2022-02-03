import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser';


const app = express();
 app.use(cors());
 app.use(bodyParser.json({limit: '120kb'}));
 app.use(bodyParser.urlencoded({limit: '120kb', extended: true}));


 app.get('/', (req, res) => {
     res.send('Hello World');
     console.log('Test Success');
 })

 let PORT = process.env.PORT || 8000;

 

 app.listen(PORT)