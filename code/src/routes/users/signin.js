import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
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
    async (req, res) => {
        const { email, password } = req.body
        const user = await searchUserByEmail(email)
        if (!user) {
            res.status(HTTP_STATUS_NOT_FOUND).send('Usuário ou senha inválidos')
            return
        }
        bcrypt.compare(password, user.password, (err, passwordConfirmed) => {
            if (passwordConfirmed) {
                delete user.password
                user.token = jwt.sign(
                    { 
                        id: user.id,
                        role: user.role
                    }, 
                    process.env.SECRETKEY
                )
                res.send(user)
            } else {
                res.status(HTTP_STATUS_NOT_FOUND).send('Usuário ou senha inválidos')
            }
        })
    }
)

export { router as signinRouter }