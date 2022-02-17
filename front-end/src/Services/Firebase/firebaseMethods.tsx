import axios from 'axios';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';


export async function signUp(username:string,  password:string){
    let url:string | undefined = process.env.REACT_APP_ADD_USER_ENDPOINT;
    await createUserWithEmailAndPassword(auth, username, password)
    .catch((error) => {
        return error
    })
    .then(() => {
        let uid = auth.currentUser?.uid;
        if(!url){throw new Error('Error while fetching add user endpoint.')}
        axios.post(url+uid)
        .catch((error) => {return error})
    })
    return;
}


export function getUserToken(){
    const { currentUser } = auth
    const token = currentUser?.getIdToken(true)
    return token
};