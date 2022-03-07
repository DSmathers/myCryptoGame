import express from 'express'
import { addToWatchlist, buyCryptoWithUsd, removeFromWatchlist, sellCryptoForUsd } from '../../../controllers/users/userControllers';

const userRoutes = express.Router();

userRoutes.patch('/addToWatchlist', addToWatchlist)

userRoutes.patch('/removeFromWatchlist', removeFromWatchlist)

userRoutes.patch('/buyCryptoWithUsd', buyCryptoWithUsd)

userRoutes.patch('/sellCryptoForUsd', sellCryptoForUsd)

// future feature.
/* userRoutes.patch('/tradeCryptoForCrypto', (req, res) => {
    res.status(200).send('tradeCrypto endpoint successfully pinged')
    // will check if token pair exists in tickers, otherwise will convert both to usd for tx
}) */

export default userRoutes;
