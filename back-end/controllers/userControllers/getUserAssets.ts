import { Request, Response } from "express";
import admin from '../../services/auth/firebaseConfig'
import { getUserWallet } from "../../services/database/helpers";

function replacer(key:string,value:any){
    if(key=='_id') return undefined;
    else if(key=='__v') return undefined;
    else return value;
};

export const getUserAssets = (req:Request, res:Response) => {
    let token = req.body.data.token;
    admin.auth()
        .verifyIdToken(token)
        .then((decodedToken) => {
            const uid = decodedToken.uid;
            getUserWallet(uid).then((data) => {
                if(!data){throw new Error('Error: Something went wrong.')}
                else {
                    let trimmedData = JSON.stringify(data, replacer);
                    return res.status(200).json(trimmedData);
                }})
        .catch((error) => {throw new Error(error)});
    });
}