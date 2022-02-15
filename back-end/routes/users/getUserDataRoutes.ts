import express from 'express'
import { getAuthorizedUser } from '../../controllers/userControllers/getAuthorizedUser'

const router = express.Router()

router.get('/user/', getAuthorizedUser);
// TODO: Use above route to get user data and set as state clientside. Replaces following routes.
router.get('/user/wallet', getAuthorizedUser);
router.get('/user/watchlist', (req, res) => {
    res.send('success').status(200)
})

export default router;