import express from 'express'

import {deleteUserById} from "../../controller/users/delete.js"
import {protectedRoute} from "../../middlewares/auth.js"

const router = express.Router()

router.delete('/users/:id', protectedRoute, deleteUserById)

export { router as deleteRouter }