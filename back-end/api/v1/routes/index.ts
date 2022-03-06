import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

//import routes
import marketData from './market_data'
import users from './users';

const routes = express.Router();
dotenv.config();
routes.use(cors());
routes.use(bodyParser.json({limit: '120kb'}));
routes.use(bodyParser.urlencoded({limit: '120kb', extended: true}));

//Routing
routes.get('/', (req:Request, res:Response, next:NextFunction) => {
    console.log('ping')
    return res.status(200).send('ping');
})

routes.use('/coins', marketData)
routes.use('/users', users)
// /users
// /transactions



export default routes;