import mongoose from "mongoose";
import IUser from '../../interfaces/User'

const SupportedCoinsSchemaProps = {
    type: Number,
    required: false,
    min: 0
}

const SupportedCoins = new mongoose.Schema({
    "usd": SupportedCoinsSchemaProps,
    "bitcoin": SupportedCoinsSchemaProps,
    "ethereum": SupportedCoinsSchemaProps,
    "tether": SupportedCoinsSchemaProps,
    "binancecoin": SupportedCoinsSchemaProps,
    "usd-coin": SupportedCoinsSchemaProps,
    "ripple": SupportedCoinsSchemaProps,
    "solana": SupportedCoinsSchemaProps,
    "cardano": SupportedCoinsSchemaProps,
    "terra-luna": SupportedCoinsSchemaProps,
    "avalanche-2": SupportedCoinsSchemaProps
});


const userSchema = new mongoose.Schema<IUser>({
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

const User = mongoose.model("User", userSchema)


export default User;
