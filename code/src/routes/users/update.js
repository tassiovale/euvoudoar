import express from 'express'
import {protectedRoute} from "../../middlewares/auth.js"
import {updateUserById} from "../../controller/users/update.js"
const router = express.Router()

router.put('/users/:id', protectedRoute, updateUserById )

export { router as updateRouter }