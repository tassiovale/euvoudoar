import _ from 'lodash'
import express from 'express'
import { searchPagedDonations } from '../../db/donate.js'

const router = express.Router()

router.get('/', async (req, res) => {
    console.log('req.query: '+req.query)
    const { keyword } = req.query
    console.log('keyword: '+keyword)
    const donations = await searchPagedDonations(req.query)
    res.send(donations)
})

export { router as searchPagedRouter }