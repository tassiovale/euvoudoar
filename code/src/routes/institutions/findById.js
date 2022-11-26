import express from 'express'
import { HTTP_STATUS_NOT_FOUND, HTTP_STATUS_OK } from '../../constants/httpStatusCodes.js'
import { findInstitutionById } from '../../db/institution.js'

const router = express.Router()

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const institution = await findInstitutionById(id)
    if (!institution) {
        return res.status(HTTP_STATUS_NOT_FOUND).json({ message: 'Institution not found' })
    }
    return res.status(HTTP_STATUS_OK).json(institution)
})

export { router as findById }