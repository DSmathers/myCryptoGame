import express from 'express'
import { createUserWallet } from '../../controllers/userControllers/createUserWallet';
import addNewUser from '../../services/database/addNewUser';
import { lookupUser } from '../../services/database/helpers';

const router = express.Router();

router.post('/new-user/:uid', createUserWallet)

export default router;