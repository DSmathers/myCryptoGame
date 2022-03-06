interface IUser {
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

export default IUser;