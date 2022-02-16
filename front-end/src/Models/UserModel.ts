export interface User {
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