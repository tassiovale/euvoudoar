import _ from 'lodash'
import express from 'express'
import { getUsers, setUsers } from '../../helpers/fakeDatabase.js'

const router = express.Router()

router.delete('/users/:id', (req, res) => {
    const users = getUsers()
    const { id } = req.params
    const elements = _.remove(users, { id })
    setUsers(users)
    res.send(elements)
})

export { router as deleteRouter }