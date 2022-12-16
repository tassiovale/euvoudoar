import {deleteUser, findUserById} from '../../db/user.js'

const deleteUserById = async (req, res) => {
    const { id } = req.params

    const user = await findUserById(id)

    if (typeof user == undefined || user == null){
        res.send([])
    }else{
        await deleteUser(id)
        res.send([req.params])
    }
    
}

export { deleteUserById }