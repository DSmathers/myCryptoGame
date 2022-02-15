import mongoose, { Date } from 'mongoose'


interface newUser {
    uid: string,
    wallet: {
        usd: number,
        btc?: number,
        eth?: number,
        algo?: number
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
    wallet: {
        usd: {type: Number, required: false},
        btc: {type: Number, required: false},
        eth: {type: Number, required: false},
        usdt: {type: Number, required: false},
        bnb: {type: Number, required: false},
        usdc: {type: Number, required: false},
        xrp: {type: Number, required: false},
        ada: {type: Number, required: false},
        sol: {type: Number, required: false},
        dot: {type: Number, required: false},
    },
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