import axios from 'axios';
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
    })
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
    })
    return userData;
}


export const addtoWatchlist = async (id:string, coin:string) => {
    const connectionURL = process.env.DB_CONNECTION_URL;
    mongoose.connect(connectionURL?connectionURL:'').catch(error => console.log(error))
    let query = User.where({uid:id});
    query.findOneAndUpdate({uid:id}, {$addToSet: {watchlist: coin}}, {}, (err, data) => {
        if(err){console.log(err)}
    })
}


export const removeFromWatchlist = async (id:string, coin:string) => {
    const connectionURL = process.env.DB_CONNECTION_URL;
    mongoose.connect(connectionURL?connectionURL:'').catch(error => console.log(error))
    let query = User.where({uid:id})
    query.findOneAndUpdate({uid: id}, {$pull: {watchlist: coin}}, {}, (err, data) => {
        if(err){console.log(err)}
    })
};


export const getCurrentPrice = async (coin:string, amount:number, used:string) => {
    let price:number = 0;
    await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=' + coin + '&vs_currencies=' + used).then((res) => {
        price = price + (Number(res.data[coin][used]) * amount)
    }).catch((err) => { return new Error(err.message)})
    return price
}


export const postNewTransaction = async (uid:string, assIn: string, assInNumber: number, assOut:string, assOutNum: number) => {
    const connectionURL = process.env.DB_CONNECTION_URL;
    mongoose.connect(connectionURL?connectionURL:'').catch(error => console.log(error))
    let user = await User.findOne({uid:uid});
    if(!user){return new Error('User Not Found')}
    // Helper Function returns dot notation string. 
    let dotNotated = (string:string) => {
        let value:string = "wallet." + string;
        return value;
    }
    if(assIn === 'usd'){
        assInNumber = Number(assInNumber.toFixed(2))
    }
    if(assOut === 'usd'){
        assOutNum = Number(assOutNum.toFixed(2))
    }

    let updateData = 
    {
    $inc: {
        [dotNotated(assOut)]: -assOutNum,
        [dotNotated(assIn)]: assInNumber
    },
    $addToSet: {transactions: {
        date: new Date(),
        summary: {
            out_asset_id: assOut,
            out_asset_total: assOutNum,
            in_asset_id: assIn,
            in_asset_total: assInNumber
            }
        }
    }};
    let doc = await User.findOneAndUpdate({uid:uid}, updateData, {new:true})
    return doc;
}