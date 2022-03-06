import User from './userSchema'

export const createNewUserObject = (uid:string) => {
    const newUser = new User({
        uid: uid,
        wallet: {
            usd: 100000
        },
        watchlist: [],
        transactions: [{
            date: new Date(),
            summary: {
                out_asset_id: "n/a",
                out_asset_total: 0,
                in_asset_id: "usd",
                in_asset_total: 100000
            }
        }]

    }) 
    return newUser
}


