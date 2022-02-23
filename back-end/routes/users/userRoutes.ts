import express from 'express'
import { getAuthorizedUser } from '../../controllers/userControllers/getAuthorizedUser'
import { isAuthorizedUser } from '../../services/auth/authHelpers';
import { addtoWatchlist, removeFromWatchlist } from '../../services/database/helpers';

const router = express.Router()

router.get('/', getAuthorizedUser);



// Add to watchlist endpoint.
router.patch('/watchlist', (req, res) => {
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

router.patch('/watchlist/rm', (req, res) => {
    const token = req.headers.authorization;
    const coin = req.body.data;
    if(!token){
        return res.status(500).send({"Error": 'Authorization Error'})
    }
    isAuthorizedUser(token).then((uid) => {
        removeFromWatchlist(uid, coin);
    });
    res.status(200).send('Removed Function Fired -- testing')
})

export default router;