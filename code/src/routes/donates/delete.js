import _ from 'lodash'
import HTTP_STATUS_BAD_REQUEST from '../../constants/httpStatusCodes.js'
import HTTP_STATUS_NOT_FOUND from '../../constants/httpStatusCodes.js'
import express from 'express'
import { deleteDonate } from '../../db/donate.js'

const router = express.Router()


 router.delete('/:id', async (req, res) => {
    const { id } = req.params
    if (!id) {
        res.status(HTTP_STATUS_BAD_REQUEST).send('id is required')
        return
    }
    const deletedDonate = await deleteDonate(id)
    if (_.isEmpty(deletedDonate)) {
        res.status(HTTP_STATUS_NOT_FOUND).send('donate not found')
        return
    }
    res.send(deletedDonate)
})

export { router as deleteRouter }