import { Request, Response } from "express";
import admin from '../../services/auth/firebaseConfig'
import { getUser } from "../../services/database/helpers";

function replacer(key:string,value:any){
    if(key=='_id') return undefined;
    else if(key=='__v') return undefined;
    else return value;
};

export const getAuthorizedUser = (req:Request, res:Response) => {
    let newToken:string | undefined = req.headers.authorization
    if(!newToken){
        throw new Error('No Token Recieved')
    };
    admin.auth()
        .verifyIdToken(newToken)
        .then((decodedToken) => {
            const uid = decodedToken.uid;
            getUser(uid).then((data) => {
                if(!data){throw new Error('Error: Something went wrong.')}
                else {
                    // Trims object id hash and version key from the data before sending to client
                    let trimmedData = JSON.stringify(data, replacer);
                    return res.status(200).json(JSON.parse(trimmedData));
                }})
        .catch((error) => {throw new Error(error)});
    });
}