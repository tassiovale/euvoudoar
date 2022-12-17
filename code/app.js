import express from 'express'
import jwt from 'jsonwebtoken'

import userRoutes from './src/routes/users/index.js'
import testRoutes from './src/routes/tests/index.js'
import institutionRoutes from './src/routes/institutions/index.js'
import donateRoutes from './src/routes/donates/index.js'
import {HTTP_STATUS_UNAUTHORIZED} from './src/constants/httpStatusCodes.js'
import donationProfiles from './src/routes/donationProfiles/index.js'

const app = express()

app.use(express.json())

app.use(testRoutes)

app.use(userRoutes)

app.use('/donations', donateRoutes)

app.use("/institutions", institutionRoutes)

app.use("/", donationProfiles)

export { app }