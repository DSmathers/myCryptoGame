import admin from './firebaseConfig'

export function isAuthorizedUser(token:string){
    let uid = admin.auth().verifyIdToken(token).then((decodedToken) => {
        return decodedToken.uid
    }).catch((error) => {
        throw new Error(error)
    })
    return uid;
}