import express from 'express'
import { createNewUser } from '../../controllers/users/createNewUser'
import userRoutes from './user/userRoutes';

const users = express.Router();


users.post('/new-user', createNewUser);
users.use('/user', userRoutes)


export default users;