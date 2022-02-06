import mongoose from 'mongoose'
import User from '../../models/UserWallet'



async function addNewUser(uid:string) {
    const connectionURL = process.env.DB_CONNECTION_URL;
    let newUser = new User({uid:uid, usd: 10000})
    mongoose.connect(connectionURL?connectionURL:'').catch(error => console.log(error))
    await newUser.save()
    .catch((error) => {return error.message})
}

export default addNewUser;