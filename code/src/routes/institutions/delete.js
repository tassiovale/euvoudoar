import express from 'express'
import { protectedRoute } from '../../middlewares/auth.js'
import { validateRequest } from '../../middlewares/validateRequest.js'
import { deleteInstitutionByIdController } from '../../controller/institutions/delete.js'

const router = express.Router()

router.delete('/:id', protectedRoute, validateRequest, deleteInstitutionByIdController)

export { router as deleteRouter }