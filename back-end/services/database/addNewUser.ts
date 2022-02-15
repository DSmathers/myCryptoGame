import mongoose from 'mongoose'
import User from '../../models/UserWallet'

async function addNewUser(uid:string) {
    let newUser = new User(
        {
        uid: uid,
        wallet: {
            usd: 10000
        },
        transactions: {
            date: new Date(),
            summary: {
                out_asset_id: "n/a",
                out_asset_total: 0,
                in_asset_id: "usd",
                in_asset_total: 10000
            }
        }})
    const connectionURL = process.env.DB_CONNECTION_URL;
    mongoose.connect(connectionURL?connectionURL:'').catch(error => console.log(error))
    await newUser.save()
    .catch((error) => {console.log(error.message)})
};



export default addNewUser;