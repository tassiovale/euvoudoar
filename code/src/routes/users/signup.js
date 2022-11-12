import express from 'express'
import { body } from 'express-validator'
import { HTTP_STATUS_CREATED } from '../../constants/httpStatusCodes.js'
import { createUser } from '../../db/user.js'
import { validateRequest } from '../../middlewares/validateRequest.js'

const router = express.Router()

router.post(
    '/users',
    [
        body('name')
            .notEmpty()
            .withMessage('Você deve fornecer o nome do usuário'),
        body('email')
            .isEmail()
            .withMessage('E-mail inválido'),
    ],
    validateRequest,
    async (req, res) => {        
        const createdUser = await createUser(req.body)
        res.status(HTTP_STATUS_CREATED).send(createdUser)
    }
)

export { router as signupRouter }