import _ from 'lodash'
import {HTTP_STATUS_NOT_FOUND, HTTP_STATUS_BAD_REQUEST, HTTP_STATUS_UNAUTHORIZED} from '../../constants/httpStatusCodes.js'
import express from 'express'
import { deleteDonate } from '../../db/donate.js'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const { authorization } = req.headers
    if (!authorization) {
        res.status(HTTP_STATUS_BAD_REQUEST).send('Cabeçalho de autorização não encontrado')
        return
    }
    if (!id) {
        res.status(HTTP_STATUS_BAD_REQUEST).send('ID não informado')
        return
    }
    const token = authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.SECRETKEY)
    const { id: userId } = decoded
    if(!userId){
        res.status(HTTP_STATUS_UNAUTHORIZED).send('Token inválido')
        return
    }
    const deletedDonate = await deleteDonate(id, userId)
    if (_.isEmpty(deletedDonate)) {
        res.status(HTTP_STATUS_NOT_FOUND).send('Usuário não encontrado')
        return
    }
    res.send(deletedDonate)
})

export { router as deleteRouter }