import { NextFunction, Request, Response} from 'express'
import User from '../../models/users/userSchema';
import verifyUser from '../../services/auth/verifyUser'



export function addToWatchlist (req:Request, res:Response, next:NextFunction){
    const token = req.headers.authorization;
    const coin = req.body.data
    if(!token){
        return res.status(401).send('Unauthorized Request')
    }
    if(!coin){
        return res.status(204).send('No Content')
    }
    else verifyUser(token).then((uid) => {
        User.findOneAndUpdate({uid:uid}, {$addToSet: {watchlist: coin}}, {}, (err, data) => {
            if(err){
                return res.status(400).send('Unable to add to watchlist. ')
            }
            else {
                return res.status(201).send(`${coin} added to watchlist`)}
        })
    }).catch((err) => {
        return res.status(401).send(err.message)
    })

}

export function removeFromWatchlist (req:Request, res:Response, next:NextFunction){

}

export function buyCryptoWithUsd (req:Request, res:Response, next:NextFunction){

}

export function sellCryptoForUsd (req:Request, res:Response, next:NextFunction){

}