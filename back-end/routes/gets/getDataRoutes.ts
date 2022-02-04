import express from 'express'
import { getTopTen } from '../../services/coinGeckoAPI';

const router = express.Router();

router.get('/get-top-ten', async (req, res, next) => {
    await getTopTen().then(data => {
        res.status(200).json(data)
    })
    .catch(error => {
        console.log(error)
    })
});



export default router;