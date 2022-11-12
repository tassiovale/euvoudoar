import _ from 'lodash'
import express from 'express'
import { searchUsers } from '../../db/user.js'

const router = express.Router()

router.get('/users', async (req, res) => {
    const users = await searchUsers(req.query)
    res.send(users)
})

export { router as searchRouter }