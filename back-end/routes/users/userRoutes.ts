import express from 'express'
import { Error } from 'mongoose';
import { getAuthorizedUser, replacer } from '../../controllers/userControllers/getAuthorizedUser'
import { isAuthorizedUser } from '../../services/auth/authHelpers';
import { removeFromWatchlist, getUser, getCurrentPrice, postNewTransaction } from '../../services/database/helpers';

const router = express.Router()

router.get('/', getAuthorizedUser);



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

router.patch('/buy', async (req, res) => {
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
});


let getTokenBalance = (path:string, user:any) => {
    return new Promise<number>((resolve, reject) => {
        const parts = path.split(".");
        if(!user){throw new Error("Error fetching wallet balance")}
        try {
            resolve(parts.reduce((obj, part) => obj[part], user))
        } catch (error) {
            reject(error)
        }
    })
}

router.patch('/sell', async (req, res) => {
    const token:string | undefined = req.headers.authorization;
    const currentPrice = await getCurrentPrice(req.body.assetId, req.body.saleAmount, 'usd');
    if(!token){return res.status(500).send('Unauthorized Request')}
    else{
        isAuthorizedUser(token).then((uid) => {
            getUser(uid).then((user) => {
                getTokenBalance(`wallet.${req.body.assetId}`, user).then((balance) => {
                    if(balance>=req.body.saleAmount){
                        postNewTransaction(uid, 'usd', currentPrice, req.body.assetId, req.body.saleAmount)
                        .then((doc) => {
                            if(doc){
                                let response = JSON.stringify(doc, replacer)
                                res.status(200).send(response)
                            }
                        })
                        .catch((err) => {
                            res.status(500).json(err)
                        })
                    }
                })
            })
        })
    }
})

export default router;