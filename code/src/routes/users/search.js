import _ from 'lodash'
import express from 'express'
import { getUsers } from '../../helpers/fakeDatabase.js'

const router = express.Router()

router.get('/users', (req, res) => {
    const users = getUsers()
    if (_.isEmpty(req.query)) {
        res.send(users)
    } else {
        const filteredUsers = _.filter(users, req.query)
        res.send(filteredUsers)
    }
})

export { router as searchRouter }