import express from 'express'
import { protectedRoute } from '../../middlewares/auth.js'
import { enforceAuthorization } from '../../middlewares/casbinHandler.js'
import { validateRequest } from '../../middlewares/validateRequest.js'
import { deleteInstitutionByIdController } from '../../controller/institutions/delete.js'
import { OBJECT_INSTITUTION } from '../../constants/objects.js'
import { ACTION_DELETE, ACTION_DELETE_ALL } from '../../constants/actions.js'

const router = express.Router()

router.delete(
    '/:id', 
    protectedRoute, 
    validateRequest,
    enforceAuthorization(
        OBJECT_INSTITUTION,
        [
            ACTION_DELETE,
            ACTION_DELETE_ALL
        ]
    ),
    deleteInstitutionByIdController
)

export { router as deleteRouter }