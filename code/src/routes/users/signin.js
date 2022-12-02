import express from 'express'
import jwt from 'jsonwebtoken'
import { body } from 'express-validator'

import { HTTP_STATUS_NOT_FOUND } from '../../constants/httpStatusCodes.js'
import { searchUserByEmail } from '../../db/user.js'
import { validateRequest } from '../../middlewares/validateRequest.js'

const router = express.Router()

router.post(
    '/signin',
    [
        body('email')
            .isEmail()
            .withMessage('E-mail inválido')
    ],
    validateRequest,
    async (req, res) => {    
        const { email } = req.body  
        const user = await searchUserByEmail(email)
        if (!user) {
            res.status(HTTP_STATUS_NOT_FOUND).send('Usuário não encontrado')
            return
        }
        const token = jwt.sign({ id: user.id }, process.env.SECRETKEY, {
            expiresIn: 86400 // expira em 24h
        })
        res.send({ auth: true, token: token })
    }
)

export { router as signinRouter }