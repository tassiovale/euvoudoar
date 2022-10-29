import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import { body } from 'express-validator'
import { HTTP_STATUS_CREATED } from '../../constants/httpStatusCodes.js'
import { getUsers, setUsers } from '../../helpers/fakeDatabase.js'
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
    (req, res) => {        
        const users = getUsers()
        const { name, email } = req.body
        const user = {
            id: uuidv4(),
            name,
            email
        }
        users.push(user)
        setUsers(users)
        res.status(HTTP_STATUS_CREATED).send(user)
    }
)

export { router as signupRouter }