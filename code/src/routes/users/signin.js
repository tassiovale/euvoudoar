import express from 'express'
import { body } from 'express-validator'
import { validateRequest } from '../../middlewares/validateRequest.js'

import {sign} from "../../controller/users/signin.js"

const router = express.Router()

router.post(
    '/signin',
    [
        body('email')
            .isEmail()
            .withMessage('E-mail inválido'),
        body('password')
            .isStrongPassword({
                minLength: 8,
                minNumbers: 1,
                minSymbols: 1
            })
            .withMessage('Senha deve conter no mínimo 8 caracteres, com letras, números e símbolos'),
    ],
    validateRequest,
    sign
)

export { router as signinRouter }