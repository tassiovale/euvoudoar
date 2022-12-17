import express from 'express'
import { body } from 'express-validator'
import { HTTP_STATUS_CREATED } from '../../constants/httpStatusCodes.js'
import { createDonate } from '../../db/donate.js'
import { validateRequest } from '../../middlewares/validateRequest.js'

const router = express.Router()

router.post(
    '/',
    [
        body('value')
            .notEmpty()
            .withMessage('Você deve fornecer um valor para a instituição.'),
        body('donorId')
            .notEmpty()
            .withMessage('Usuario invalido'),
        body('institutionId')
            .notEmpty()
            .withMessage('Você deve informar a instiuição de destino da doação')
    ],
    validateRequest,
    async (req, res) => {
        const donation = {
            institutionId: req.body.institutionId,
            donorId: req.body.donorId,
            recurrence: req.body.recurrence,
            recurrenceExpirationDate: new Date(req.body.recurrenceExpirationDate),
            value: req.body.value,
            createdBy: req.body.donorId,
            updatedBy: req.body.donorId
        }
        const donationCreated = await createDonate(donation)
        res.status(HTTP_STATUS_CREATED).send(donationCreated)
    }
)

export { router as createRouter }