import { trimUserObject } from "../../helpers/trimUserObject";
import User from "../../models/users/userSchema";


export function getAndTrimUserData(uid:string){
    return new Promise((resolve, reject) => {
        User.findOne({uid:uid})
            .then((userDoc) => {
                const trimmedData = JSON.stringify(userDoc, trimUserObject)
                resolve(JSON.parse(trimmedData))
            })
            .catch((error) => {
                console.log(error);
                reject(error)
            })
    })
}