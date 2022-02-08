import mongoose from 'mongoose'

interface User {
    uid: string,
    // Supported Coins Goes Here...
    usd: number,
    btc?: number,
    eth?: number,
    algo?: number
}

const walletSchema = new mongoose.Schema<User>({
    uid: {type: String, required: true},
    usd: {type: Number, required: false},
    btc: {type: Number, required: false},
    eth: {type: Number, required: false}
})

const User = mongoose.model('Wallets', walletSchema);

export default User