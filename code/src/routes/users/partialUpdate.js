import _ from 'lodash'
import express from 'express'
import { getUsers, setUsers } from '../../helpers/fakeDatabase.js'
import { HTTP_STATUS_NOT_FOUND } from '../../constants/httpStatusCodes.js'

const router = express.Router()

router.patch('/users/:id', (req, res) => {
    const users = getUsers()
    const { id } = req.params
    const index = _.findIndex(users, { id })
    if (index > -1) {
        const { name, email } = req.body
        if (name) {
        users[index] = { ...users[index], name }
        }
        if (email) {
        users[index] = { ...users[index], email }
        }
        setUsers(users)
        res.send(users[index])
    } else {
        res.status(HTTP_STATUS_NOT_FOUND).send()
    }
})

export { router as partialUpdateRouter }