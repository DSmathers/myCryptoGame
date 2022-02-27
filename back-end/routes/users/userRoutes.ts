import express from 'express'
import { Error } from 'mongoose';
import { getAuthorizedUser, replacer } from '../../controllers/userControllers/getAuthorizedUser'
import { isAuthorizedUser } from '../../services/auth/authHelpers';
import { addtoWatchlist, removeFromWatchlist, getUser, getCurrentPrice, postNewTransaction } from '../../services/database/helpers';

const router = express.Router()

router.get('/', getAuthorizedUser);



// Add to watchlist endpoint.
router.patch('/watchlist/add', (req, res) => {
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

router.patch('/transaction', async (req, res) => {
    const token:string | undefined = req.headers.authorization
    if(!token){return res.status(500).send('Unauthorized Request')}
    let currentPrice = await getCurrentPrice(req.body.data.coinId, req.body.data.purchaseAmount, req.body.data.currencyUsed)
    isAuthorizedUser(token).then((uid) => {
        getUser(uid).then((user) => {
            if(user !== null && user.wallet.usd >= currentPrice){
                postNewTransaction(uid, req.body.data.coinId, req.body.data.purchaseAmount, req.body.data.currencyUsed, Number(currentPrice.toFixed(2)))
                .then((doc) => {
                    if(!doc){return}
                    let response = JSON.stringify(doc, replacer)
                    res.status(200).send(response)
                })
            }
            else throw new Error('Error posting transaction.')
        })
        .catch((err) => res.status(500).send(err.message))
    })
    return
})

export default router;