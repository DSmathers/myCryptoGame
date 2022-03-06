import express from 'express'
import getMarketData, { getSelectedCoin } from './getMarketData';

const marketData = express.Router();


// change to getSupportedCoinsData
marketData.get('/getSupported', getMarketData)
marketData.get('/getSelected/:selectedCoinId', getSelectedCoin)
marketData.get('/:id', (req, res) => {
    console.log(req.params.id)
    res.status(200).send('ping')
})





export default marketData;