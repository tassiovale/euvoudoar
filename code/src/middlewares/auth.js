import jwt from 'jsonwebtoken'
import { HTTP_STATUS_UNAUTHORIZED } from "../constants/httpStatusCodes.js"

export const protectedRoute = (req, res, next) => {
    console.log(req.headers['x-access-token'])
    jwt.verify(
        req.headers['x-access-token'], 
        process.env.SECRETKEY,
        (err, decoded) => {
            if (err) {
                console.log(err)
                return res.status(HTTP_STATUS_UNAUTHORIZED).send()
            } else {
                console.log(decoded)
                next()
            }
        }
    )
}