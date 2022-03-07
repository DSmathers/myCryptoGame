import { NextFunction, Request, Response } from "express";
import { createNewUserObject } from "../../models/users/newUserObject";
import User from "../../models/users/userSchema";
import verifyUser from "../../services/auth/verifyUser";

export const createNewUser = async (req: Request, res: Response, next: NextFunction) => {
    // check for token
    if(!req.headers.authorization || req.headers.authorization===''){
        return res.status(500).send('Authorization Error')
    }
    const token = req.headers.authorization;
    // check if the user is authorized;
    const userId = await verifyUser(token)
    // if not authorized, send error and unauthorized request status.
    if(!userId){
        return res.status(401).send('user not authorized')
    }
    // if authorized, check to see if user already exists in db
    const userExists = await User.findOne({uid: userId})

    // if user already exists in database, skip create user step.
    if(userExists){
        //create better error handling here
        return res.status(202).send('user authorized but already exists in database, skipping create wallet step...')
    }
    //otherwise create user
    else{
        // add new user to db here
        const newUser = createNewUserObject(userId)
        await newUser.save().then((user) => {
            return res.status(201).send(user);
        }).catch((err) => {
            return console.log(err.message)
        })
        
    }
}