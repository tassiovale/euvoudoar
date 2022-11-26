import express from 'express'
import jwt from 'jsonwebtoken'

import userRoutes from './src/routes/users/index.js'
import institutionRoutes from './src/routes/institutions/index.js'
import donateRoutes from './src/routes/donates/index.js'
import {HTTP_STATUS_UNAUTHORIZED} from './src/constants/httpStatusCodes.js'
import donationProfiles from './src/routes/donationProfiles/index.js'

const app = express()

app.use(express.json())

app.use(userRoutes)

app.use('/donations',donateRoutes)

app.use("/institutions", hundleAuth, institutionRoutes)

app.use("/", hundleAuth, donationProfiles)

function hundleAuth(req, res, next){
    jwt.verify(
        req.headers['x-access-token'],
        process.env.SECRETKEY,
        function (err,decoded){
            if (err){
                res.sendStatus(HTTP_STATUS_UNAUTHORIZED)
            }else{
                req.userId = decoded.id
                next()
            }
        }
    )
}

export { app }