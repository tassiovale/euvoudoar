import express from 'express'
import { body } from 'express-validator'
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
            .withMessage('E-mail inválido')
    ],
    validateRequest,
    async (req, res) => {      
        const user = await searchUsers({email:req.body.email})
        if (typeof user == undefined || user.length == 0){

            const createdUser = await createUser({
                name: req.body.name,
                email: req.body.email,
                role: req.body.role
            })

            createdUser.token = jwt.sign(
                {id:createdUser.id},
                process.env.SECRETKEY,
                {expiresIn: "4h"}
            )
            res.status(HTTP_STATUS_CREATED).send(createdUser)
        }else {
            var resp = {
                "message": "This email is already used.",
                "user": req.body
            }
            res.status(HTTP_STATUS_CONFLIT).send(resp)
        }
    }
)

export { router as signupRouter }