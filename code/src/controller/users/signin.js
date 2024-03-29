import bcrypt from 'bcrypt'
import { HTTP_STATUS_NOT_FOUND, HTTP_STATUS_SERVER_ERROR } from '../../constants/httpStatusCodes.js'
import { findUserWhere } from '../../db/user.js'
import { makeToken } from '../../helpers/makeToken.js'

const sign = async (req, res) => {
    const { email, password } = req.body

    findUserWhere({ email }).then((users) => {
        const user = users[0]
        if (!user) {
            res.status(HTTP_STATUS_NOT_FOUND).send('Usuário ou senha inválidos')
            return
        }
        bcrypt.compare(password, user.password, (err, passwordConfirmed) => {
            if (passwordConfirmed) {
                delete user.password
                user.token = makeToken(user)
                res.send(user)
            } else {
                res.status(HTTP_STATUS_NOT_FOUND).send('Usuário ou senha inválidos')
            }
        })

    }).catch((error) => {
        res.status(HTTP_STATUS_SERVER_ERROR).send(error)
    })

}

export { sign }