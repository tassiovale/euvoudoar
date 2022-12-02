import express from 'express'
import { HTTP_STATUS_NOT_FOUND, HTTP_STATUS_OK } from '../../constants/httpStatusCodes.js'
import { findInstitutionById } from '../../db/institution.js'
import { findDonateById } from '../../db/donate.js'
import { findUserById } from '../../db/user.js'


const router = express.Router()

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const donate = await findDonateById(id)
    console.log(donate)
    if (!donate) {
        return res.status(HTTP_STATUS_NOT_FOUND).json({ message: 'Donate not found' })
    }

    const institution = await findInstitutionById(donate.institutionId)
    const donor = await findUserById(donate.donorId)
    const creator = await findUserById(institution.creatorId)
    const updater = await findUserById(institution.updaterId)
    const deleter = institution.deleterId != null ? await findUserById(institution.deleterId) : null
    return res.status(HTTP_STATUS_OK).json({
        id,
        institution :{
            id: institution.id,
            name: institution.name,
        },
        donor: {
            id:donate.donorId,
            name: donor.name,
        },
        recurrence: donate.recurrence,
        recurrenceExpirationDate:donate.recurrenceExpirationDate,
        value: donate.value,
        status:donate.status,
        createdAt: donate.createdAt,
        updatedAt: donate.updatedAt,
        deletedAt: donate.deletedAt != null ? institution.deletedAt : null,
        createdBy: {
            id: creator.id,
            name: creator.name,
        },
        updatedBy: {
            id: updater.id,
            name: updater.name,
        },
        deletedBy: deleter ? {
            id: deleter.id,
            name: deleter.name,
        } : null
    })
})

export { router as findDonateByIdRouter }