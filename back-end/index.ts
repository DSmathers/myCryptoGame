import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';


//Import Routes
import getRoutes from './routes/markets/getMarketData'
import createNewUser from './routes/users/postNewUser'
import getUserData from './routes/users/getUserDataRoutes'

dotenv.config()
const app = express();
 app.use(cors());
 app.use(bodyParser.json({limit: '120kb'}));
 app.use(bodyParser.urlencoded({limit: '120kb', extended: true}));

let PORT = process.env.PORT || 8000;

app.get('/', (req, res,  next) => {
    res.status(200).send('PING');
})

//Routing
app.use('/API/markets/', getRoutes);
app.use('/API/users/', getUserData);
app.use('/API/users/new-user/', createNewUser);


app.listen(PORT)