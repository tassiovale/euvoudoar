import express from 'express'
import { body } from 'express-validator'
import { validateRequest } from '../../middlewares/validateRequest.js'
import { signup } from "../../controller/users/signup.js"

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
        body('password')
            .isStrongPassword({
                minLength: 8,
                minNumbers: 1,
                minSymbols: 1
            })
            .withMessage('Senha deve conter no mínimo 8 caracteres, com letras, números e símbolos'),
        body('passwordConfirmation').custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Senhas não conferem')
            }
            return true
        })
    ],
    validateRequest,
    signup
)

export { router as signupRouter }