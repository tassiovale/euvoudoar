import express from 'express'
import { body } from 'express-validator'
import { validateRequest } from '../../middlewares/validateRequest.js'
import { protectedRoute } from '../../middlewares/auth.js'
import { createInstitutionController } from '../../controller/institutions/create.js'

const router = express.Router()

router.post(
    '/',
    [
        body('name')
            .notEmpty()
            .withMessage('Você deve fornecer o nome da Instituição.'),
        body('cnpj')
            .notEmpty()
            .withMessage('Forneça o cnpj'),
        body('images')
            .notEmpty()
            .withMessage('Adicione o link de pelo menos uma imagem da instituição.'),
        body('description')
            .notEmpty()
            .withMessage('Adicione uma descrição para a instituição')
    ],
    protectedRoute,
    validateRequest,
    createInstitutionController
)

export { router as createRouter }