import express from 'express';
import { body, param } from 'express-validator';
import { updateInstitutionController } from '../../controller/institutions/update.js';
import { protectedRoute } from '../../middlewares/auth.js';
import { validateRequest } from '../../middlewares/validateRequest.js'
const router = express.Router();

router.put(
    '/:institutionId',
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
        param('institutionId')
            .notEmpty()
    ],
    protectedRoute,
    validateRequest,
    updateInstitutionController
);

export { router as updateRouter };