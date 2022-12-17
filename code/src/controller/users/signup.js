import bcrypt from 'bcrypt'

import { HTTP_STATUS_CREATED, HTTP_STATUS_CONFLIT } from '../../constants/httpStatusCodes.js'
import { createUser, searchUsers } from '../../db/user.js'
import { makeToken } from '../../helpers/makeToken.js'

const signup = async (req, res) => {
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
                        createdUser.token = makeToken(createdUser)
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

export { signup }