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