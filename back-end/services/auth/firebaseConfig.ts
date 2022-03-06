import admin from 'firebase-admin';
const serviceAccount = require('../../authKey.json')
export default admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://testauth-3b6ef-default-rtdb.firebaseio.com"
 });
