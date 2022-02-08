import express from 'express'
import { createUserWallet } from '../../controllers/userControllers/createUserWallet';


const router = express.Router();

router.post('/:uid', createUserWallet)

export default router;