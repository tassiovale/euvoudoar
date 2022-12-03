import jwt from 'jsonwebtoken'

export const getLoggedUser = (req) => {
    return jwt.verify(req.headers['x-access-token'], process.env.SECRETKEY)
}