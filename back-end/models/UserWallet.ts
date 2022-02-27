import mongoose, { Date } from 'mongoose';
import SupportedCoins from './SupportedCoins'


interface newUser {
    uid: string,
    wallet: {
        usd: number,
    },
    watchlist?: [string],
    transactions?: [{
        date: Date,
        summary: {
            out_asset_name: string,
            out_asset_total: number,
            in_asset_name: string,
            in_asset_total: number
        }
    }]
};


const userSchema = new mongoose.Schema<newUser>({
    uid: {type: String, required: true},
    wallet: SupportedCoins,
    watchlist: [{type: String, required: false}],
    transactions: [{
        date: {type: Date, required: true},
        summary: {
            out_asset_id: {type: String, required: true},
            out_asset_total: {type: Number, required: true},
            in_asset_id: {type: String, required: true},
            in_asset_total: {type: Number, required: true}
        }
    }]
})


const User = mongoose.model('Users', userSchema);

export default User