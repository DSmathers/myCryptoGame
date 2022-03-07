// temporary 
import admin from '../../../../services/auth/firebaseConfig'

const verifyUser = (token:string) => {
    return new Promise<string>((resolve, reject) => {
        admin.auth().verifyIdToken(token).then((user) => {
            if(user){
                resolve(user.uid)
            } else reject('Unauthorized Request')
        })    
    })
}


export default verifyUser;