import { searchUsers } from '../../db/user.js'

const searchUser = async (req, res) => {
    const users = await searchUsers(req.query)
    res.send(users)
}

export { searchUser }