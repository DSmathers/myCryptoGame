import express from 'express'
import PORT from '../../index';

const router = express.Router();

router.get('/', (req, res, next) => {
    try {
        res.status(200).send('Test Route Success on port: '+ PORT);
    } catch (error:any) {
        res.status(404).send(error.message)
    }
});



export default router;