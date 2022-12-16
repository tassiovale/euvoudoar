import express from 'express'
const router = express.Router()

import {updateUserById} from "../../controller/users/partialUpdate.js" 
import {protectedRoute} from "../../middlewares/auth.js"

router.patch('/users/:id', protectedRoute, updateUserById)

export { router as partialUpdateRouter }