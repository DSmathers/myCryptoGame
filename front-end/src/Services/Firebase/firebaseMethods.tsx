import axios from 'axios';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { auth } from './firebaseConfig';


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