import { getUsers, setUsers } from '../../helpers/fakeDatabase.js'
import { HTTP_STATUS_NOT_FOUND } from '../../constants/httpStatusCodes.js'

const updateUserById = async (req, res) => {
    const users = getUsers()
    const { id } = req.params
    const index = _.findIndex(users, { id })
    if (index > -1) {
        const { name, email } = req.body
        users[index] = { id, name, email }
        setUsers(users)
        res.send(users[index])
    } else {
        res.status(HTTP_STATUS_NOT_FOUND).send()
    }
}

export { updateUserById }