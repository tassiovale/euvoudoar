import express from 'express'
import { body } from 'express-validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { HTTP_STATUS_CREATED, HTTP_STATUS_CONFLIT } from '../../constants/httpStatusCodes.js'
import { createUser, searchUsers } from '../../db/user.js'
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
    async (req, res) => {
        const { name, email, password } = req.body
        const user = await searchUsers({ email })
        if (typeof user == undefined || user.length == 0) {
            const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || 10)
            bcrypt.genSalt(saltRounds, async (err, salt) => {
                if (err) {
                    res.status(HTTP_STATUS_SERVER_ERROR).send()
                } else {
                    bcrypt.hash(password, salt, async (err, hash) => {
                        if (err) {
                            res.status(HTTP_STATUS_SERVER_ERROR).send()
                        } else {
                            const createdUser = await createUser({
                                name,
                                email,
                                password: hash
                            })
                            delete createdUser.password
                            createdUser.token = jwt.sign(
                                { 
                                    id: createdUser.id,
                                    role: createdUser.role
                                },
                                process.env.SECRETKEY
                            )
                            res.status(HTTP_STATUS_CREATED).send(createdUser)
                        }
                    })
                }
            })
        } else {
            var resp = {
                "message": "This email is already used.",
                "user": req.body
            }
            res.status(HTTP_STATUS_CONFLIT).send(resp)
        }
    }
)

export { router as signupRouter }