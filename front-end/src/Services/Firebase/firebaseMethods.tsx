import axios from 'axios';
import { createUserWithEmailAndPassword, User } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { useState } from 'react';


export function placeHolder (){
    return
}

export function signUp(username:string,  password:string){
    createUserWithEmailAndPassword(auth, username, password)
    .catch((error) => {
        return error
    })
    .then(() => {
        let uid = auth.currentUser?.uid;
        axios.post('http://localhost:8000/api/users/new-user/'+uid)
        .catch((error) => {return error});
    })
    return;
}


export function getUserToken(){
    const { currentUser } = auth
    const token = currentUser?.getIdToken(true)
    return token
      /*   .then((idToken) => {
            return idToken;
            
        })
        .catch((error) => {
            throw new Error(error)
        }) */
    
};