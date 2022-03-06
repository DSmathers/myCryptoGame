import express from 'express'

const userRoutes = express.Router();

userRoutes.patch('/addToWatchlist', (req, res) => {
    res.status(200).send('add to watchlist endpoint successfully pinged')
    //db service to verify user
    //then push new item to watchlist if not duplicate
})

userRoutes.patch('/removeFromWatchlist', (req, res) => {
    res.status(200).send('removeFromWatchlist endpoint successfully pinged')
    //db service to verify user
    //then remove item from watchlist if it exists
})

userRoutes.patch('/buyCryptoWithUsd', (req, res) => {
    res.status(200).send('buyCrypto endpoint successfully pinged')
    //auth service to verify user
    //db service to get user wallet details
    //coingecko service to get current price of crypto
    //helper to calculate total cost of tx
    //db service to check if user can afford tx
    //create new tx object and push to user.transactions array
    //update wallet balances
    //return new user object on success or error message on failure
})

userRoutes.patch('/sellCryptoForUsd', (req, res) => {
    res.status(200).send('sellCrypto endpoint successfully pinged')
    //same as before
})

userRoutes.patch('/tradeCryptoForCrypto', (req, res) => {
    res.status(200).send('tradeCrypto endpoint successfully pinged')
    // will check if token pair exists in tickers, otherwise will convert both to usd for tx
})

export default userRoutes;
