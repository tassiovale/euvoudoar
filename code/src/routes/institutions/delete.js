import express from 'express'
import { HTTP_STATUS_NOT_FOUND, HTTP_STATUS_OK, HTTP_STATUS_UNAUTHORIZED } from '../../constants/httpStatusCodes.js'
import { findInstitutionById, updateInstitutionById } from '../../db/institution.js'
import { getLoggedUser } from '../../helpers/authentication.js'
import { ADMIN } from '../../constants/roles.js'

const router = express.Router()

router.delete('/:id', async (req, res) => {
    const user = getLoggedUser(req)
    if (user.role != ADMIN) {
        return res.status(HTTP_STATUS_UNAUTHORIZED)
            .json({ message: 'You do not have the necessary permissions to perform this operation.' })
    } else {
        const { id } = req.params
        const institution = await findInstitutionById(id)
        if (!institution) {
            return res.status(HTTP_STATUS_NOT_FOUND).json({ message: 'Institution not found' })
        }
        institution.deletedAt = new Date()
        institution.deleterId = user.id
        await updateInstitutionById(institution, id)
        return res.status(HTTP_STATUS_OK).json({ message: 'Institution deleted', institution })
    }


})

export { router as deleteRouter }