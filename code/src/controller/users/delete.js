import { HTTP_STATUS_NOT_FOUND, HTTP_STATUS_OK } from '../../constants/httpStatusCodes.js'
import { deleteUser, findUserById } from '../../db/user.js'

const deleteUserById = async (req, res) => {
    const { id } = req.params
    const user = await findUserById(id)
    if (typeof user == undefined || user == null) {
        res.status(HTTP_STATUS_NOT_FOUND).send([])
    } else {
        let user = await deleteUser(id)
        res.status(HTTP_STATUS_OK).json(user)
    }

}

export { deleteUserById }