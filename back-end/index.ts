import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose'
import User from './models/UserWallet';


//Import Routes
import routes from './api/v1/routes'

import getRoutes from './routes/markets/getMarketData'
import createNewUser from './routes/users/postNewUser'
import userRoutes from './routes/users/userRoutes'

dotenv.config()
const app = express();
app.use(cors());
app.use(bodyParser.json({limit: '120kb'}));
app.use(bodyParser.urlencoded({limit: '120kb', extended: true}));


const PORT = process.env.PORT || 8000;


app.use('/api/v1/', routes);


app.get('/', (req, res,  next) => {
    return res.status(200).send('PING');
})

//Routing
app.use('/API/markets/', getRoutes);
app.use('/API/users/user', userRoutes);
app.use('/API/users/new-user/', createNewUser);

const conn = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_URL || '');
        console.log('connection to mongoDB established')    
    } catch (error) {
        console.log('error connecting to mongoDB')
    }
}

conn().then(() => {
    app.listen(PORT, () => {
        console.log(`Server Running on port: ${PORT}`)
    })
}).catch((err) => {
    console.log('Error: ' + err)
});


