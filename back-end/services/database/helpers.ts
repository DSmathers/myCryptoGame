import { response } from 'express';
import mongoose from 'mongoose';
import User from '../../models/UserWallet';

const connectionURL = process.env.DB_CONNECTION_URL;

export const lookupUser = async (id:string) => {
    let doesExist = false;
    const connectionURL = process.env.DB_CONNECTION_URL;
    mongoose.connect(connectionURL?connectionURL:'').catch(error => console.log(error))
    let user = User.where({uid:id})
    await user.findOne().then((user) => {
        if(user){
            doesExist = true;
        }
    }).catch((err) => {
        console.log(err);
    });
    return doesExist
};

export const getUserWallet = async (id:string) => {
    const connectionURL = process.env.DB_CONNECTION_URL;
    mongoose.connect(connectionURL?connectionURL:'').catch(error => console.log(error))
    let userData = User.where({uid:id});
    let userWallet = await userData.findOne().then((user) => {
        return user;
    }).catch((error) => {
        throw new Error(error);
    });
    return userWallet;
}