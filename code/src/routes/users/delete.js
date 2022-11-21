import _ from 'lodash'
import express from 'express'
import {deleteUser, findUserById} from '../../db/user.js'

const router = express.Router()

router.delete('/users/:id', async (req, res) => {
    const { id } = req.params

    const user = await findUserById(id)

    if (typeof user == undefined || user == null){
        res.send([])
    }else{
        await deleteUser(id)
        res.send([req.params])
    }
    
})

export { router as deleteRouter }