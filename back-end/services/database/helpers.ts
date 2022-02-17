import { connect } from 'http2';
import mongoose from 'mongoose';
import User from '../../models/UserWallet';


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

export const getUser = async (id:string) => {
    const connectionURL = process.env.DB_CONNECTION_URL;
    mongoose.connect(connectionURL?connectionURL:'').catch(error => console.log(error))
    let query = User.where({uid:id});
    let userData = await query.findOne().then((user) => {
        return user;
    }).catch((error) => {
        throw new Error(error);
    });
    return userData;
}


export const addtoWatchlist = async (id:string, coin:string) => {
    const connectionURL = process.env.DB_CONNECTION_URL;
    mongoose.connect(connectionURL?connectionURL:'').catch(error => console.log(error))
    let query = User.where({uid:id});
    query.findOneAndUpdate({uid:id}, {$addToSet: {watchlist: coin}}, {}, (err, data) => {
        if(err){console.log(err)}
    })
    console.log(query)
}