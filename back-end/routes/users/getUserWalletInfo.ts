import express from 'express'
import { getUserAssets } from '../../controllers/userControllers/getUserAssets'

const router = express.Router()

router.post('/user/wallet', getUserAssets);

export default router;