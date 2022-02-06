import express, { Request, Response } from 'express'
import addNewUser from '../../services/database/addNewUser';
import { lookupUser } from '../../services/database/helpers';

export const createUserWallet = async(req:Request, res:Response) => {
    let newUid = req.params.uid;
    let alreadyExists = await lookupUser(newUid);
    if(alreadyExists){
        return res.status(500).json("Error: User Already Exists");
    }
    else {
        try {
            addNewUser(newUid)
            res.status(200).json("Success: New Wallet Added");
        } catch (error) {
            res.status(500).json("Error: Something went wrong.")
        }
    }
}