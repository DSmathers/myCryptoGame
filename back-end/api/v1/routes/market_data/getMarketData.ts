import { NextFunction, Request, Response } from 'express'
import { getSelectedCoinDetails, getSupportedCoinsData } from '../../services/coinGecko/coinGeckoEndpoints'





export function getMarketData(req:Request, res:Response, next:NextFunction){
    getSupportedCoinsData().then((coins) => {
        if(coins){
            res.status(200).send(coins.data)
        } else return res.status(500).send('error')
    });
    // data from coinGecko
}
export default getMarketData


export function getSelectedCoin(req:Request, res:Response, next:NextFunction){
    const selectedCoinId = req.params.selectedCoinId
    if(!selectedCoinId){
        return res.status(500).send(`Error fetching data for: ${selectedCoinId}`)
    }
    else getSelectedCoinDetails(selectedCoinId).then((coinData) => {
        if(!coinData){
            return res.status(500).send(`Error fetching data for: ${selectedCoinId}`)
        }
        else {

            return res.status(200).json(coinData)}
    }).catch((err) => {
        console.log(err)
        return res.status(500).send('Server Error')
    })
}