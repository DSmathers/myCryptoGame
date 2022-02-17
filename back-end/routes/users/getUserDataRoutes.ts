import express from 'express'
import { getAuthorizedUser } from '../../controllers/userControllers/getAuthorizedUser'
import { isAuthorizedUser } from '../../services/auth/authHelpers';
import { addtoWatchlist } from '../../services/database/helpers';

const router = express.Router()

router.get('/user', getAuthorizedUser);
// TODO: Use above route to get user data and set as state clientside. Replaces following routes.
router.get('/user/wallet', getAuthorizedUser);
router.get('/user/watchlist', (req, res) => {
    res.send('success').status(200)
})


router.patch('/user/watchlist', (req, res) => {
    if(req){
        const token = req.headers.authorization;
        const coin = req.body.data
        if(!token){
            return res.status(500).send({"Error": 'Authorization Error'})
        }
        isAuthorizedUser(token).then((uid) => {
            addtoWatchlist(uid, coin)
        });
        res.status(200).send('ping')
    }
})

export default router;