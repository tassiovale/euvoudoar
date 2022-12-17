import jwt from 'jsonwebtoken'
import { HTTP_STATUS_UNAUTHORIZED } from "../constants/httpStatusCodes.js"

export const protectedRoute = (req, res, next) => {
    jwt.verify(
        req.headers['x-access-token'],
        process.env.SECRETKEY,
        (err, decoded) => {
            if (err) {
                return res.status(HTTP_STATUS_UNAUTHORIZED).send()
            } else {
                next()
            }
        }
    )
}