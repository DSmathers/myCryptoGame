import mongoose from 'mongoose';

const SupportedCoinsSchemaProps = {
    type: Number,
    required: false,
    min: 10
}

const SupportedCoins = new mongoose.Schema({
    "usd": {SupportedCoinsSchemaProps},
    "bitcoin": {SupportedCoinsSchemaProps},
    "ethereum": {type: Number, required: false},
    "tether": {type: Number, required: false},
    "binancecoin": {type: Number, required: false},
    "usd-coin": {type: Number, required: false},
    "ripple": {type: Number, required: false},
    "solana": {type: Number, required: false},
    "cardano": {type: Number, required: false},
    "terra-luna": {type: Number, required: false},
    "avalanche-2": {type: Number, required: false}
});

export default SupportedCoins