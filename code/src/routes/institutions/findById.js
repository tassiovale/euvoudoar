import express from 'express'
import { HTTP_STATUS_NOT_FOUND, HTTP_STATUS_OK } from '../../constants/httpStatusCodes.js'
import { findImageByInstitutionId } from '../../db/image.js'
import { findInstitutionById } from '../../db/institution.js'
import { findPaymentGatewayByInstitutionId } from '../../db/paymentGateway.js'
import { findUserById } from '../../db/user.js'


const router = express.Router()

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const institution = await findInstitutionById(id)
    if (!institution) {
        return res.status(HTTP_STATUS_NOT_FOUND).json({ message: 'Institution not found' })
    }
    const images = await findImageByInstitutionId(id)
    const paymentGateway = await findPaymentGatewayByInstitutionId(id)
    const creator = await findUserById(institution.creatorId)
    const updater = await findUserById(institution.updaterId)
    const deleter = institution.deleterId != null ? await findUserById(institution.deleterId) : null
    return res.status(HTTP_STATUS_OK).json({
        id,
        name: institution.name,
        cnpj: institution.cnpj,
        paymentGateway: {
            type: paymentGateway.type,
            apiKey: paymentGateway.apiKey
        },
        description: institution.description,
        images: images.map(image => image.url),
        createdAt: institution.createdAt,
        updatedAt: institution.updatedAt,
        deletedAt: institution.deletedAt != null ? institution.deletedAt : null,
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

export { router as findById }